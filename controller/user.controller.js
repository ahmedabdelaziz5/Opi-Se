const userRepo = require('../models/user/user.repo');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
    try {
        const userData = req.body;
        let user = await userRepo.isExist({$or: [{userName: userData.userName}, {email: userData.email}, {nationalId: userData.nationalId}]}, '_id');
        if(user.success){
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        let addUser = await userRepo.createUser(userData);
        if(!addUser.success){
            return res.status(addUser.statusCode).json({
                message: addUser.message,
            });
        }
        return res.status(addUser.statusCode).json({
            message: addUser.message,
        });
        
    }
    catch (err) {
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
}

exports.login = async (req, res) => {
    try{
        const userData = req.body;
        let user = await userRepo.isExist({userName: userData.userName});
        if(!user.success){
            return res.status(user.statusCode).json({
                message: user.message,
            });
        }
        let passwordMatch = await bcrypt.compare(userData.password, user.data.password);
        if(!passwordMatch){
            return res.status(400).json({
                message: "wrong password !",
            });
        }
        let token = jwt.sign({id: user.data._id, userName : user.data.userName, email : user.data.email}, process.env.SECRET_JWT);
        return res.status(200).json({
            message: "success",
            token: token,
            data : user.data 
        });
    }
    catch(err){
        return res.status(500).json({
            message: "error",
            error: err.message
        });
    }
}

exports.verifyAccount = async (req, res) => {

}

exports.forgetPasswrod = async (req, res) => {

}

exports.changePassword = async (req, res) => {

}

exports.editProfile = async (req, res) => {

}

exports.uploadProfileImage = async (req, res) => {

}

exports.changeProfileImage = async (req, res) => {

}













