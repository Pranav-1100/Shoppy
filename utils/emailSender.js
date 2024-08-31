const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, text) => {
  const info = await transporter.sendMail({
    from: '"E-commerce Support" <support@ecommerce.com>',
    to,
    subject,
    text,
  });
  console.log('Message sent: %s', info.messageId);
};

module.exports = { sendEmail };