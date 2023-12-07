const userModel = require('../user/user.model');
const bcrypt = require('bcrypt');
const saltRounds = 7;

// check if the user is exist in the database
exports.isExist = async (filter, select, populate) => {
    try {
        const user = await userModel.findOne(filter).populate(populate).select(select).select('-password').lean();
        if (user) {
            return {
                success: true,
                statusCode: 409,
                message: "user already exist !",
                data: user
            }
        }
        return {
            success: false,
            statusCode: 400,
            message: "user not exist , please sign up first !",
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

// creates the user in the database + password validation logic 
exports.createUser = async (data) => {
    try {
        if (data.password != data.confirmPassword) {
            return {
                success: false,
                statusCode: 400,
                message: "password and confirm password not match !"
            }
        }
        const newPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = newPassword;
        let user = new userModel(data);
        let isAdded = await user.save();
        if (!isAdded) {
            return {
                success: false,
                statusCode: 400,
                message: "user not added !"
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

// update user data in database + email and userName validation logic 
exports.updateUser = async (filter, edit, populate, select) => {
    try {

        if (edit.email || edit.userName) {
            let match = await userModel.findOne({ $or: [{ email: edit.email }, { userName: edit.userName }] });
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

        let user = await userModel.findOneAndUpdate(filter, edit, { new: true }).populate(populate).select(select).lean();
        console.log(user);
        if (!user) {
            return {
                success: false,
                statusCode: 400,
                message: "user not exist , please sign up first !",
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success",
            data: user
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

// when the users dismatch it update the users data in one query 
exports.updateManyUsers = async (filter, edit) => {
    try {
        let user = await userModel.updateMany(filter, edit);
        if (!user) {
            return {
                success: false,
                statusCode: 400,
                message: "user not exist , please sign up first !",
            }
        }
        return {
            success: true,
            statusCode: 201,
            message: "success",
            data: user
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

// updae users data using bulk write
exports.bulkUpdate = async (filter) => {
    try {
        const updatePartners = await userModel.bulkWrite(filter);
        if(!updatePartners){
            return {
                success: false,
                statusCode: 417,
                message: "error updating users data after match",
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