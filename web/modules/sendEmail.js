const nodeMailer = require("nodemailer");

module.exports = {
  sendBranchUserMail: (values, callback) => {
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
      // text: `Your ID: ${values.BranchUser_id}
      //        User Name: ${values.FirstName}
      //        Branch Location: ${values.branchLocation}
      //        Your Password: ${values.originalPassword}
      //        You have to reset your password at your first Login!`,
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
            <h2>Your have been selected!</h2>
          </div>
          <div class="content">
            <h2>Welcome to Xpress !</h2>
            <p>Hi ${values.FirstName},</p>
            <p>Your have been registeted to the system as Branch User with the following details:</p>
            <p>Your ID: ${values.BranchUser_id}</p>
            <p>User Name : ${values.Email}</p>
            <p>Password : ${values.originalPassword} </p>
            <p>Branch Location : ${values.branchLocation} </p>
            <p>You have to reset your password at your first Login!</p>
          </div>
      </body>
    </html>
  `,
    };

    transporter.sendMail(branchUserMailOptions, (error, info) => {
      if (error) {
        return callback(error);
      } else {
        return callback(null, info);
      }
    });
  },
  sendadminMail: (values, callback) => {
    console.log("inside mail function");
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
      // text: `Your ID: ${values.admin_Id}
      //       Name: ${values.FirstName}
      //       Your Password: ${values.originalPassword}
      //       Use your email as your user name!`,

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
            <h2>Your have been selected!</h2>
          </div>
          <div class="content">
            <h2>Welcome to Xpress !</h2>
            <p>Hi ${values.FirstName},</p>
            <p>Your have been registeted to the system as Admin with the following details:</p>
            <p>Password : ${values.originalPassword} </p>
            <p>User Name : ${values.Email}</p>
          </div>
      </body>
    </html>
  `,
    };

    transporter.sendMail(adminMailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return callback(error);
      } else {
        console.log(info);
        return callback(null, info);
      }
    });
  },
  sendOrderConfirmMail: (values, callback) => {
    // console.log("inside mail function")
    // console.log(values);
    let transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: "courierxpress851@gmail.com",
        pass: "pvgt xtzm psqv auyb",
      },
    });

    let OrderConfirmMailOptions = {
      from: {
        name: "Xpress",
        address: "courierxpress851@gmail.com",
      },
      to: values.Email,
      subject: `Your Order ${values.Order_id} Successfuly asign to ${values.branchLocation} branch.`,
      // text: `Hi ${values.Email} user, 

      //       your order ${values.Order_id} is Successfuly asign to ${values.branchLocation} branch.

      //       Your package's timely arrived is our priority`,

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
            <p>Hi ${values.Email} user,</p>
            <p>Your order ${values.Order_id} has been successfully assigned to ${values.branchLocation} branch.</p>
            <p>Your package's timely arrival is our priority.</p>
          </div>
      </body>
    </html>
  `,
    };

    transporter.sendMail(OrderConfirmMailOptions, (error, info) => {
      if (error) {
        console.log(`Error is at ${error}`);
        return callback(error);
      } else {
        // console.log(`information about email ${info}`);
        return callback(null, info);
      }
    });
  },
};
