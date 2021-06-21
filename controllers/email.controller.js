const nodemailer = require("nodemailer");
const EmailMessage = {};
const config = require("../config/config").email;
const handleResponse = require("../utils/response.js");

EmailMessage.sendMessage = function (req, res) {
  const { sender, message, subject } = req.body;

  async function main(sender, subject, message) {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.user,
        pass: config.password,
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail(
      {
        from: sender,
        to: "adenusidamilola5@gmail.com",
        subject: subject,
        text: message,
      },
      (error, info) => {
        if (error) handleResponse(req, res, 403, null, error);
        else handleResponse(req, res, 403, 200, { data: info.messageId });
      }
    );
  }
  main(sender, subject, message);
};

module.exports = EmailMessage;
