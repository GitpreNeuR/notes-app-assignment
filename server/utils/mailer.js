const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  port: 465,
  auth: {
    user: "devangbanta44@gmail.com",
    pass: "akya puuz sjay pzcs",
  },
});

const sendEmail = async (email, subject, html) => {
  try {
    const mailOptions = {
      from: "devangbanta@gmail.com",
      to: email,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error;
  }
};

module.exports = sendEmail;