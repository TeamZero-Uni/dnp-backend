const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendMail = async ({ to, subject, html }) => {
    try {
        const info = await transporter.sendMail({
            from: `"DNP Support"<${process.env.EMAIL}>`,
            to,
            subject,
            html
        })
        console.log("Mail Sent :", info.messageId);
    } catch (error) {
        console.log("Mail Error", error.message);
    }
};

module.exports = {sendMail};
