// function to send verification mail to new mails 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.setUpMails = async (emailType, emailCredentials) => {

  let mailOptions = {
    from: 'Opi Se Team',
    to: `${emailCredentials.email}`,
  };

  if (emailType === "verificationMail") {
    let token = jwt.sign({ email: emailCredentials.email }, process.env.SECRET_JWT, { expiresIn: `1d` });
    mailOptions['subject'] = "verify your account";
    mailOptions['text'] = "please click the verify button to verify your account";
    mailOptions['html'] = `<b> <a href= https://graduation-project-j6gl.onrender.com/verifyAccount?token=${token} target= '_blank'>verify</b>`;
  }

  else if (emailType === "forgetPasswrodEmail") {
    let token = jwt.sign({ email: emailCredentials.email }, process.env.SECRET_JWT, { expiresIn: `1d` });
    mailOptions['subject'] = "forget passowrd access";
    mailOptions['text'] = "please click the button to reset your account password";
    mailOptions['html'] = `<b> <a href= https://graduation-project-j6gl.onrender.com/forgetPassword?token=${token} target= '_blank'>reset password</b>`;
  }

  else if (emailType === "rejectionEmail") {
    mailOptions['subject'] = "partner request status update";
    mailOptions['text'] = `Dear learner,

we are very sorry to inform you that your partner request has been rejected by the other learner.

your chance doesn't end here, we believe that you will find your best match jsut hit the button and get more recommendations :)

regards ... Opi Se Team
  `;
  }

  let result = await sendEmails(mailOptions);
  return result;

}

const sendEmails = async (mailOptions) => {
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.MAIL}`,
        pass: `${process.env.PASS}`
      },
    });

    let obj = {
      success: true,
      statusCode: 200,
      message: "success and your email was sent !"
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        obj.success = false,
          obj.statusCode = 400,
          obj.message = "could not send your email"
      }
    })

    return obj;
  }
  catch (err) {
    console.log(err);
    return {
      success: false,
      statusCode: 500,
      message: "unexpected error"

    }

  }
}
