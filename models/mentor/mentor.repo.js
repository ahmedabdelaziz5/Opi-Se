const mentorModel = require('./mentor.model');
const bcrypt = require('bcrypt');
const saltRounds = 7;

exports.isExist = async (filter, select, populate) => {
    try {
        const mentor = await mentorModel.findOne(filter).populate(populate).select(select).select('-password').lean();
        if (mentor) {
            return {
                success: true,
                statusCode: 409,
                message: "mentor already exist !",
                data: mentor
            };
        }
        return {
            success: false,
            statusCode: 400,
            message: "mentor not exist, please sign up first !",
        };
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.getAll = async (filter, select, populate, pagg) => {
    try {
        const skip = (pagg.page - 1) * pagg.limit;
        const mentors = mentorModel.find(filter).skip(skip).limit(pagg.limit).populate(populate).select(select).lean();
        const count = mentorModel.countDocuments(filter);
        const [mentorsResult, countResult] = await Promise.all([mentors, count]);
        if (!countResult) {
            return {
                success: false,
                statusCode: 404,
                message: "There is no mentors with this filter yet !",
            }
        }
        return {
            statusCode: 200,
            success: true,
            message: "success",
            totalNumOfItems: countResult,
            totalPages: Math.ceil(countResult / parseInt(pagg.limit)),
            currentPage: pagg.page,
            data: mentorsResult
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.createMentor = async (data) => {
    try {
        const newPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = newPassword;
        let mentor = new mentorModel(data);
        let isAdded = await mentor.save();
        if (!isAdded) {
            return {
                success: false,
                statusCode: 400,
                message: "mentor not added !"
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success",
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        }
    }
};

exports.updateMentor = async (filter, edit, populate, select) => {
    try {
        if (edit.email || edit.userName) {
            let match = await mentorModel.findOne({ $or: [{ email: edit.email }, { userName: edit.userName }] });
            if (match) {
                if (match.email === edit.email) {
                    return {
                        success: false,
                        statusCode: 409,
                        message: "email is already exist !"
                    }
                }
                else if (match.userName === edit.userName) {
                    return {
                        success: false,
                        statusCode: 400,
                        message: "user name is already taken !"
                    }
                }
            }
        }
        let mentor = await mentorModel.findOneAndUpdate(filter, edit, { new: true }).populate(populate).select(select).lean();
        if (!mentor) {
            return {
                success: false,
                statusCode: 400,
                message: "mentor not exist, please sign up first !",
            }
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            data: mentor
        }
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        };
    };
};

exports.getList = async (filter, select, pagg) => {
    try {
        const skip = (pagg.page - 1) * pagg.limit;
        let data = await mentorModel.findOne(filter).select(select).lean();
        data = data[`${select}`];
        const result = data.slice(skip, skip + pagg.limit);
        if (!data.length) {
            return {
                success: false,
                statusCode: 404,
                message: `There is no ${select} yet !`
            };
        }
        return {
            success: true,
            statusCode: 200,
            message: "success",
            totalNumOfItems: data.length,
            totalPages: Math.ceil(data.length / pagg.limit),
            currentPage: pagg.page,
            data: result
        };
    }
    catch (err) {
        return {
            success: false,
            statusCode: 500,
            message: err.message
        };
    };
};