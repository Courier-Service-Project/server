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
      text: `Your OTP Code : ${otp}`,
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
