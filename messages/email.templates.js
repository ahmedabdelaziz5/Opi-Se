// object that holds all the messages/parameters which is sent in emails

const emailTemplate = {
    from: "Opi Se Team",
    verificationMail: {
        subject: "Verify your account",
        text: "Please click the verify button to verify your account",
    },
    forgetPasswordEmail: {
        subject: "Forget password access",
        text: "Please click the button to reset your account password",
    },
    rejectionEmail: {
        subject: "Partner request status update",
        text: `Dear learner,

                    we are very sorry to inform you that your partner request has been rejected by the other learner.
        
                     your chance doesn't end here, we believe that you will find your best match just hit the button and get more recommendations :)
        
                 regards ... Opi Se Team
          `
    },
};

module.exports = emailTemplate;