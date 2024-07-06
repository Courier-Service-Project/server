const nodeMailer = require("nodemailer");


module.exports = {
  sendBranchUserMail:(values,callback)=>{

    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssshashini21@gmail.com",
        pass: "qkqwxmyfjtygfsko",
      },
    });

    let branchUserMailOptions = {
      from: "ssshashini21@gmial.com",
      to: values.Email,
      subject: `Congratulations ${values.FirstName}! You have been choosen up.`,
      text: `Your ID: ${values.BranchUser_id}
             User Name: ${values.FirstName}
             Branch Location: ${values.branchLocation}
             Your Password: ${values.originalPassword}
             You have to reset your password at your first Login!`,
    };

    transporter.sendMail(branchUserMailOptions,(error, info) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null,info);
      }
    });
  },


  sendadminMail:(values,callback) => {
    console.log("inside mail function")
    console.log(values);
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "ssshashini21@gmail.com",
        pass: "qkqwxmyfjtygfsko",
      },
    });

    let adminMailOptions = {
      from: "ssshashini21@gmial.com",
      to: values.Email,
      subject: `Congratulations ${values.FirstName}! You have been choosen up.`,
      text: `Your ID: ${values.admin_Id}
            Name: ${values.FirstName}
            Your Password: ${values.originalPassword}
            Use your email as your user name!`,
    };

    transporter.sendMail(adminMailOptions,(error, info) => {
      if (error) {
        console.log(error);
        return callback(error);
      } else {
        console.log(info);
        return callback(null,info);
      }
    });
  }
};