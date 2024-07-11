const nodemailer = require("nodemailer");

module.exports = {
  sendForgotEmail: (otp) => {
    console.log("email");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.email",
      port: 587,
      secure: false,
      auth: {
        user: "courierxpress851@gmail.com",
        pass: "pvgt xtzm psqv auyb",
      },
    });

    const mailOption = {
      from: {
        name: "Xpress",
        address: "courierxpress851@gmail.com",
      },
      to: "malindasuresh47@gmail.com",
      subject: "Forgot Password Recovery",
      //text: `Your OTP Code : ${otp}`,
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #FFFFFF;
            padding: 20px;
          }
          .header {
            background-color: #4caf50;
            color: white;
            text-align: center;
            padding: 10px;
            border-radius: 10px 10px 0 0;
          }
          .content {
            padding: 20px;
          }
        </style>
      </head>
      <body>
          <div class="header">
            <h2>Your Order Confirmation</h2>
          </div>
          <div class="content">
            <h2>Welcome to Xpress !</h2>
            <p>Your OTP Code is </p>
            <p>Please enter the 4-digit code below on the email verification page: ${otp}</p>
            <p></p>
            <p>Thanks,</p>
            <pThe Xpress Team</p>
          </div>
      </body>
    </html>
  `,
    };

    return new Promise((resolve, reject) => {
      transporter.sendMail(mailOption, (error, info) => {
        if (error) {
          //console.log("Error:", error);
          return reject(error);
        }
        //console.log("Email sent successfully:");
        return resolve(info);
      });
    });
  },
};
