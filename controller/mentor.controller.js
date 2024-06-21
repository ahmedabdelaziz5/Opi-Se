const bcrypt = require('bcrypt');
const saltRounds = 7;
const jwt = require('jsonwebtoken');
const mentorRepo = require('../models/mentor/mentor.repo');
const { setUpMails } = require('../helpers/sendEmail');
const { generateOtp } = require('../helpers/generateOTP');
const { removeImageFromCloudinary, uploadImageToCloudinary } = require('../services/uploadImageToCloudinary');

// function that allows mentor to sign up
exports.signUp = async (req, res) => {
    try {
        const mentorData = req.body;
        let mentor = await mentorRepo.isExist(
            {
                $or: [
                    { userName: mentorData.userName },
                    { email: mentorData.email },
                    { nationalId: mentorData.nationalId }
                ]
            },
            '_id'
        );
        if (mentor.success) return res.status(mentor.statusCode).json(mentor);
        const otpCode = generateOtp();
        mentorData.otpCode = otpCode;
        let addMentorPromise = await mentorRepo.createMentor(mentorData);
        let verificationMailPromise = await setUpMails("OTPMail", { email: mentorData.email, otpCode });
        let result = await Promise.all([addMentorPromise, verificationMailPromise]);
        if (!result[0].success || !result[1].success) {
            return res.status(417).json({
                message: "unexpected error !"
            });
        }
        return res.status(200).json({
            success: true,
            message: "success"
        });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could't add your account, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows mentor to login
exports.login = async (req, res) => {
    try {
        const mentorData = req.body;
        const select = '-deviceTokens -notifications -sentRequests'
        let mentor = await mentorRepo.updateMentor(
            { userName: mentorData.userName },
            { $addToSet: { deviceTokens: mentorData.deviceToken } },
            '',
            select
        );
        if (!mentor.success) return res.status(mentor.statusCode).json(mentor);
        if (!mentor.data.isVerified) {
            return res.status(400).json({
                message: "please verify your account first !",
                data: { email: mentor.data.email }
            });
        }
        let passwordMatch = await bcrypt.compare(mentorData.password, mentor.data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "wrong password !",
            });
        }
        let token = jwt.sign({
            id: mentor.data._id,
            userName: mentor.data.userName,
            email: mentor.data.email,
            nationalId: mentor.data.nationalId,
            role: 'mentor'
        }, process.env.SECRET_JWT);
        delete mentor.data.password;
        return res.status(200).json({
            message: "success",
            token: token,
            data: mentor.data,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Could't login, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

exports.getMentorProfile = async (req, res) => {
    try {
        const select = '-notifications -deviceTokens'
        let mentor = await mentorRepo.isExist(
            { _id: req.user.id },
            select,
        );
        if (mentor.success) {
            mentor.statusCode = 200;
            mentor.message = "success";
        }
        return res.status(mentor.statusCode).json(mentor);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get your profile !",
            error: "Unexpected Error !"
        });
    }
};

// blackBox function that allows make mentor verified
exports.verifyAccount = async (req, res) => {
    try {
        let { email, otpCode } = req.body;
        let mentor = await mentorRepo.isExist({ email }, 'email isVerified otpCode');
        if (!mentor.success) return res.status(mentor.statusCode).json(mentor);
        if (mentor.data.isVerified) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "your account is already verified !"
            });
        }
        if (mentor.data.otpCode != otpCode) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "wrong otp code !"
            });
        }
        let result = await mentorRepo.updateMentor(
            { email },
            { isVerified: true, otpCode: null },
            '',
            'email isVerified'
        );
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't verify your account !",
            error: "Unexpected Error !"
        });
    }

};

// function that re-sends a verification email
exports.resendOTP = async (req, res) => {
    try {
        const { email } = req.query;
        const mentor = await mentorRepo.isExist({ email }, 'email isVerified');
        if (!mentor.success) return res.status(mentor.statusCode).json(mentor);
        if (mentor.data.isVerified) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "your account is already verified !"
            });
        }
        const otpCode = generateOtp();
        await mentorRepo.updateMentor(
            { email },
            { otpCode },
            '',
            'userName email isVerified'
        );
        let result = await setUpMails("OTPMail", { email: email, otpCode });
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't resend verification email, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows mentor to reset his password
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let mentor = await mentorRepo.isExist(
            { email },
            '_id'
        );
        if (!mentor.success) return res.status(mentor.statusCode).json(mentor)
        const sendEmail = await setUpMails("forgetPasswordEmail", { email });
        return res.status(sendEmail.statusCode).json(sendEmail);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't reset your password, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows mentor to submit his new password from forget password email
exports.submitNewPassword = async (req, res) => {
    try {
        const { password } = req.body;
        let newPassword = await bcrypt.hash(password, saltRounds);
        let mentor = await mentorRepo.updateMentor(
            { email: req.user.email },
            { password: newPassword },
            '',
            'userName email isVerified '
        );
        return res.status(mentor.statusCode).json(mentor);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't updating you password, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows mentor to change his password inside the app
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const mentor = await mentorRepo.isExist({ _id: req.user.id }, '_id password');
        if (!mentor.success) return res.status(mentor.statusCode).json(mentor);
        let passwordMatch = await bcrypt.compare(oldPassword, mentor.data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "wrong password !"
            });
        }
        let newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
        let result = await mentorRepo.updateMentor(
            { _id: req.user.id },
            { password: newHashedPassword },
            '',
            'userName email isVerified'
        );
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't change your password, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows mentor to edit his profile data 
exports.editProfile = async (req, res) => {
    try {
        const mentorData = req.body;
        const mentorId = req.user.id;
        const mentor = await mentorRepo.updateMentor(
            { _id: mentorId },
            mentorData,
            '',
            'userName email isVerified'
        );
        return res.status(mentor.statusCode).json(mentor);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't edit your profile, please try again later !",
            error: "Unexpected Error !"
        });
    }
};

// function that allows mentor to change his profile image ( takes the type of operation upload/remove )
exports.changeProfileImage = async (req, res) => {
    try {
        const { type } = req.body;
        let result;
        if (type === "upload" && !req.file) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Can't read media file !"
            });
        }
        if (type === "upload") result = await uploadImageToCloudinary(req.file.path, req.user.id, "users images");
        else result = await removeImageFromCloudinary(req.user.id);
        if (!result.success) return res.status(result.statusCode).json(result);
        let mentor, select = 'userName email isVerified profileImage';
        if (type === "upload") {
            const url = result.data;
            mentor = await mentorRepo.updateMentor(
                { _id: req.user.id },
                { profileImage: url },
                '',
                select
            );
        }
        else mentor = await mentorRepo.updateMentor(
            { _id: req.user.id },
            { profileImage: "default.png" },
            '',
            select
        );
        return res.status(mentor.statusCode).json(mentor);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't change your profile image, please try again later !",
            error: "Unexpected Error !"
        });
    };
};

// function that allows mentor to see his notifications list 
exports.getNotifications = async (req, res) => {
    try {
        const mentorId = req.user.id;
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await mentorRepo.getList(
            { _id: mentorId },
            'notifications',
            { page, limit }
        );
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get your notification list !",
            error: "Unexpected Error !"
        });
    };
};

// function that allows mentor to see all mentors list
exports.getAllMentors = async (req, res) => {
    try {
        const { fieldOfStudy, specialization } = req.body;
        let { page, limit } = req.query;
        page ? page : page = 1;
        limit ? limit : limit = 10;
        const query = {
            fieldOfStudy,
            specialization,
            isVerified: true,
            isApproved: true
        }
        const result = await mentorRepo.getAll(
            query,
            '-mentorRequests -notifications -deviceTokens -sentRequests -__v  -password',
            '',
            { page, limit }
        );
        return res.status(result.statusCode).json(result);
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could't get mentors list !",
            error: "Unexpected Error !"
        });
    };
};