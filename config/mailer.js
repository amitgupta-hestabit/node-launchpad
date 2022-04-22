var nodemailer = require("nodemailer");


  // create reusable transporter object using the default SMTP transport
  module.exports = transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    requireTLS:true,
    auth: {
      user: 'amit.testg@gmail.com', // generated ethereal user
      pass: 'Amit123!@#', // generated ethereal password
    },
  });
