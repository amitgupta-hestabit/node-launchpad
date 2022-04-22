var nodemailer = require("nodemailer");


  // create reusable transporter object using the default SMTP transport
  module.exports = transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    requireTLS:true,
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASSORD, // generated ethereal password
    },
  });
