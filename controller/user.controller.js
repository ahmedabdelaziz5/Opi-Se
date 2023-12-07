const bcrypt = require('bcrypt');
const saltRounds = 7;
const jwt = require('jsonwebtoken');
const userRepo = require('../models/user/user.repo');
const { setUpMails } = require('../helpers/sendEmail');
const { removeImageFromCloudinary, uploadImageToCloudinary } = require('../services/uploadImageToCloudinary');

// function that allows user to sign up
exports.signUp = async (req, res) => {
    try {
        const userData = req.body;
        let user = await userRepo.isExist({ $or: [{ userName: userData.userName }, { email: userData.email }, { nationalId: userData.nationalId }] }, '_id');
        if (user.success) {
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        let addUserPromis = await userRepo.createUser(userData);
        let verificationMailPromis = await setUpMails("verificationMail", { email: userData.email });
        let result = await Promise.all([addUserPromis, verificationMailPromis]);

        if (!result[0].success || !result[1].success) {
            return res.status(417).json({
                message: "unexpected error !"
            });
        }

        return res.status(200).json({
            message: "success"
        });

    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to login
exports.login = async (req, res) => {
    try {
        const userData = req.body;
        const select = '-deviceTokens -history'
        let user = await userRepo.updateUser({ userName: userData.userName }, { $push: { deviceTokens: userData.deviceToken } }, { path: 'partnerId', select: 'userName profileImage' }, select);
        if (!user.success) {
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        if (!user.data.isVerified) {
            return res.status(400).json({
                message: "please verify your account first !",
                data: { email: user.data.email }
            });
        }
        let passwordMatch = await bcrypt.compare(userData.password, user.data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "wrong password !",
            });
        }
        let token = jwt.sign({ id: user.data._id, userName: user.data.userName, email: user.data.email, nationalId: user.data.nationalId }, process.env.SECRET_JWT);
        delete user.data.password;
        
        return res.status(200).json({
            message: "success",
            token: token,
            data: user.data,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// blackBox function that allows make user verified
exports.verifyAccount = async (req, res) => {
    try {
        let { token } = req.query;
        let decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        let user = await userRepo.updateUser({ email: decodedToken.email }, { isVerified: true });
        if (!user.success) {
            return res.status(400).send('there is no such email , please register first');
        }
        console.log(decodedToken.email);
        return res.status(200).send("your account was verified successfully !")
    }
    catch (err) {
        console.log(err.message);
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }

};

// function that resends a verification email
exports.resendVerificationEmail = async (req, res) => {
    try {
        const { email } = req.query;
        let emailUser = await setUpMails("verificationMail", { email: email });
        return res.status(emailUser.statusCode).json({
            message: emailUser.message
        })
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

// function that allows user to reset his password
exports.forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        let userMatch = await userRepo.isExist({ email });
        if (!userMatch.success) {
            return res.status(userMatch.statusCode).json({
                message: userMatch.message,
            });
        }
        const sendEmail = await setUpMails("forgetPasswrodEmail", { email });
        return res.status(sendEmail.statusCode).json({
            message: sendEmail.message,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to submit his new password from forget password email
exports.submitNewPassword = async (req, res) => {
    try {
        const { token } = req.query;
        const { password, confirmPassword } = req.body;
        if (password != confirmPassword) {
            return res.status(400).json({
                message: "password and confirm password not match !"
            });
        }
        let decodedToken = jwt.verify(token, process.env.SECRET_JWT);
        let newPassword = await bcrypt.hash(password, saltRounds);
        let user = await userRepo.updateUser({ email: decodedToken.email }, { password: newPassword });
        return res.status(user.statusCode).json({
            message: user.message,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to change his password inside the app
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        if (oldPassword === newPassword) {
            return res.status(400).json({
                message: "new password must be different from old password"
            })
        }
        if (newPassword != confirmNewPassword) {
            return res.status(400).json({
                message: "new password and confirm new password not match !"
            });
        }
        const user = await userRepo.isExist({ _id: req.user.id }, '_id password');
        if (!user.success) {
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        let passwordMatch = await bcrypt.compare(oldPassword, user.data.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "wrong password !"
            });
        }
        let newHashedPassword = await bcrypt.hash(newPassword, saltRounds);
        let updateUser = await userRepo.updateUser({ _id: req.user.id }, { password: newHashedPassword });
        return res.status(updateUser.statusCode).json({
            message: updateUser.message,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
};

// function that allows user to edit his profile data 
exports.editProfile = async (req, res) => {
    try {
        const userData = req.body;
        const userId = req.user.id;
        const user = await userRepo.updateUser({ _id: userId }, userData);
        return res.status(user.statusCode).json({
            message: user.message,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};

// function that allows user to change his profile image ( takes the type of operation upload/remove )
exports.changeProfileImage = async (req, res) => {
    try {
        const type = req.body.type;
        let result;
        if (type === "upload") {
            result = await uploadImageToCloudinary(req.file.path, req.user.id, "users images");
        }
        else if (type === "remove") {
            result = await removeImageFromCloudinary(req.user.id);
        }
        else {
            return res.status(400).json({
                message: "Not Authorized !"
            })
        }
        if (!result.success) {
            return res.status(result.statusCode).json({
                message: result.message,
            });
        }

        let user;

        if (type === "upload") {
            const url = result.data;
            user = await userRepo.updateUser({ _id: req.user.id }, { profileImage: url });
        }
        else if (type === "remove") {
            user = await userRepo.updateUser({ _id: req.user.id }, { profileImage: "default.png" });
        }

        return res.status(user.statusCode).json({
            message: user.message,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        })
    }
};
