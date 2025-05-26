const nodemailer = require("nodemailer");

exports.sendMail = async function (options) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  try {
    const emailResponse = await transporter.sendMail(mailOptions);
    console.log(emailResponse);
    return emailResponse;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
