// This file contains the data that will be used in the tests

exports.userId = "654d182623b904234537672a";
exports.nationalId = "1";
exports.partner2Id = "654d1d977d894fb32745af13"
exports.matchId = "M6547efb83e23dc3a0296970a6547efc53e23dc3a029697f"

const payload = {
    nationalId: 1,
    id : "654d182623b904234537672a"
}

const jwt = require('jsonwebtoken');
const token = jwt.sign(payload, process.env.SECRET_JWT);
exports.token = token;



exports.signUpObj = {
    userName: "ahmed",
    email: "ahmedabdelaziz@gmail.com",
    age: 19,
    gender: "male",
    location: "Egypt",
    nationalId: "124342343241233",
    password: "123",
    confirmPassword: "123",
    languages: [
        {
            languageName: "Arabic",
            level: 5
        },
        {
            languageName: "English",
            level: 4
        }
    ]
};

exports.loginObj = {
    userName: "ali",
    password: "123"
};

exports.forgetPasswordObj = {
    email: "ahmedabdelaziz6019@gmail.com"
};

exports.submitNewPasswordObj = {
    password: "123",
    confirmPassword: "123"
};

exports.changePasswordObj = {
    oldPassword: "1234",
    newPassword: "123",
    confirmNewPassword: "123"
};

exports.editProfileObj = {
    userName: "ahmed",
    email: "ahmedabdelaziz124@gmail.com",
    languages: [
        {
            languageName: "Arabic",
            level: 5
        }
    ]
};

exports.changeProfileImage = {
    type: "upload",
};

exports.submitUserPrefersObj = {
    fieldOfStudy: "math",
    specialization: "math",
    userQuestions: [
        {
            question: "x",
            answer: "y"
        },
        {
            question: "a",
            answer: "b"
        }
    ],
    userSkills: [
        {
            skillName: "math",
            skillRate: 5
        },
        {
            skillName: "english",
            skillRate: 4
        }
    ]
};

exports.declineMatchRequestObj = {
    rejectedUserId: "654d182623b904234537672a",
    email: "ahmedabdelaziz5014@gmail.com",
    requestId: "654d182623b904234537672a"
};

exports.disMatchWithPartnerObj = {
    rate : 8
};

