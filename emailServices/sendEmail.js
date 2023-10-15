// function to send verification mail to new mails 
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

exports.setUpMails = async (emailType, emailCredentials) => {

  let mailOptions = {
    from: 'Souls Team',
    to: `${emailCredentials.email}`,
  };

  if (emailType === "verificationMail") {
    let token = jwt.sign({ email: emailCredentials.email }, process.env.SECRET_JWT, { expiresIn: `1d` });
    mailOptions['subject'] = "verify your account";
    mailOptions['text'] = "please click the verify button to verify your account";
    mailOptions['html'] = `<b> <a href= 'http://localhost:2345/verifyAccount?token=${token}' target= '_blank'>verify</b>`;
//https://graduation-project-j6gl.onrender.com/
  }

  else if (emailType === "forgetPasswrodEmail") {
    let token = jwt.sign({ email: emailCredentials.email }, process.env.SECRET_JWT, { expiresIn: `1d` });
    mailOptions['subject'] = "forget passowrd access";
    mailOptions['text'] = "please click the button to reset your account password";
    mailOptions['html'] = `<b> <a href= 'http://localhost:2345/forgetPassword?token=${token}' target= '_blank'>reset password</b>`;
  }

  let result = await sendEmails(mailOptions);
  return result;

}

const sendEmails = async (mailOptions) => {

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
      success : false,
      obj.statusCode = 400,
      obj.message = "could not send your email"
    }
  })

  return obj;
}