// This file contains the data that will be used in the tests

exports.signUpObj = {
    userName : "ahmed", 
    email : "ahmedabdelaziz6018@gmail.com", 
    age : 19, 
    gender : "male", 
    location : "Egypt", 
    nationalId : "124342343243",
    password : "123",
    confirmPassword : "123", 
    languages : [
        {
            languageName : "Arabic",
            level : 5
        },
        {
            languageName : "English",
            level : 4
        }
    ]
}

exports.loginObj = {
    userName : "ahmed",
    password : "123"
}

exports.forgetPasswordObj = {
    email : "ahmedabdelaziz6019@gmail.com"
}

exports.submitNewPasswordObj = {
    password : "123",
    confirmPassword : "123"
}
