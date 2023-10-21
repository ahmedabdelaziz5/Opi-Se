// This file contains the data that will be used in the tests


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
}

exports.changeProfileImage = {
    type : "upload",
}   



