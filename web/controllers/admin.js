const {
  CheckUsernamePassword,
  AddAdmin,
  CheckOTP,
  GetAccountInfo,
  ChangeUserName,
  OTPGenerate,
  ChangeContact,
  saveForgotOTP,
  CheckforgotUsernamePassword,
  CheckPrePassword,
  ChangePassword,
  getAdminprofileDetails,
  ChangeforgotPassword,
  getAdminprofileDetailsById,
  updateImageUrl,
  deleteProfileImage
} = require("../services/admin.js");

const { sendForgotEmail } = require("../modules/sendmail.js");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
var jwt = require("jsonwebtoken");
const admin = require("../services/admin.js");
const e = require("cors");
const uploadFile = require("../modules/awsS3Config.js");
require("dotenv").config();

module.exports = {
  AdminLogin: (req, res) => {
    CheckUsernamePassword(req.body.userName, (err, result) => {
      if (err) {
        console.log(err);
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result.length == 0) {
        return res.json({
          success: 0,
          message: "invalid username",
        });
      }

      if (result) {
        //console.log(result[0].type);

        const payload = {
          user: {
            admnID: req.body.userName,
            role: result[0].type,
          },
        };
        if (compareSync(req.body.password, result[0].password)) {
          var accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });
          return res.json({
            success: 1,
            message: "correct password",
            adminID: result[0].admin_Id,
            type: result[0].type,
            name: result[0].FirstName,
            accessToken: accessToken,
          });
        } else {
          return res.json({
            success: 0,
            message: "incorrect password",
          });
        }
      }
    });
  },
  AddAdmin: (req, res) => {
    const salt = genSaltSync(10);
    const data = req.body;
    data.password = hashSync(data.password, salt);
    AddAdmin(data, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
        return res.json({
          success: 1,
          message: "successfully added admin",
        });
      }
    });
  },

  GetAccountInfo: (req, res) => {
    const id = req.query.adminID;
    GetAccountInfo(id, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },

  ChangeUserName: (req, res) => {
    const data = req.body;

    ChangeUserName(data, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },
  ChangeContact: (req, res) => {
    const data = req.body;
    ChangeContact(data, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
        return res.json({
          success: 1,
          data: result,
        });
      }
    });
  },
  CheckPrePassword: (req, res) => {
    const id = req.body.adminID;
    const Pass = req.body.Password;

    CheckPrePassword(id, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
        if (compareSync(Pass, result[0].Password)) {
          return res.json({
            success: 1,
            message: "correct password",
          });
        } else {
          return res.json({
            success: 0,
            message: "incorrect password",
          });
        }
      }
    });
  },

  ChangePassword: (req, res) => {
    const salt = genSaltSync(10);
    const data = req.body;
    //console.log(data);
    data.newPassword = hashSync(data.newPassword, salt);
    data.comPassword = hashSync(data.comPassword, salt);

    if (data.newPassword == data.comPassword) {
      ChangePassword(data, (err, result) => {
        if (err) {
          return res.json({
            success: 0,
            message: err,
          });
        }
        if (result) {
          return res.json({
            success: 1,
            message: "Successfully change password",
          });
        }
      });
    } else {
      return res.json({
        success: 1,
        message: "Not match password",
      });
    }
  },
  getAdminprofileDetails: (req, res) => {
    //const id = req.params.id;
    // console.log(id);
    getAdminprofileDetails((error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  getAdminprofileDetailsById: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    getAdminprofileDetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  checkForgetEmail: async (req, res) => {
    const email = req.body.email;
    try {
      const check = await CheckforgotUsernamePassword(email);
      if (check.length == 0) {
        return res.json({
          success: 0,
          message: "Email is not match ",
        });
      } else {
        const otp = await OTPGenerate();
        await sendForgotEmail(otp);
        await saveForgotOTP(otp, email);
      }
      return res.json({
        success: 1,
        message: "OPT sent",
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: error,
      });
    }
  },
  CheckOTP: (req, res) => {
    const email = req.body.email;
    const otp = req.body.otp;
    CheckOTP(email, (error, results) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      }
      if (results[0].Otp === otp) {
        return res.json({
          success: 1,
          message: "OTP match",
        });
      } else {
        return res.json({
          success: 0,
          message: "OTP is not match",
        });
      }
    });
  },
  ChangeforgotPassword: (req, res) => {
    const data = req.body;
    const salt = genSaltSync(10);
    data.pass = hashSync(data.pass, salt);
    // console.log(data);
    ChangeforgotPassword(data, (error, results) => {
      if (error) {
        return res.json({
          success: 0,
          message: error,
        });
      }
      if (results) {
        console.log(results);
        return res.json({
          success: 1,
          message: "password change succefully",
        });
      }
    });
  },
  updateProfile:async (req,res)=>{
    const body=req.body;
    const id=req.params.id;
    console.log(body.preview);
    const result=await uploadFile(body.preview,id)
    console.log(result);
    updateImageUrl(result.Location,id,(error,result)=>{
      if(error){
        console.log(`error is at uplaodImageUrl: ${error}`)
        return res.json({
          success:0,
          message:'Internal Server Error'
        })
      }else if(result.affectedRows>0){
        console.log(result);
        return res.json({
          success:200,
          message:"Image Successfully Update"
        })
      }
      else{
        return res.json({
          success:101,
          message:"Image Doesn't updated"
        })
      }
    })
  },
  deleteProfileImage:(req,res)=>{
    const userId=req.params.id;
    deleteProfileImage(userId,(error,result)=>{
      if(error){
        console.log(`error is at deleteProfileImage:  ${error}`)
        return res.json({
          success:0,
          message:'Internal server Error'
        })
      }else if(result.affectedRows>0){
        return res.json({
          success:200,
          message:'Deletion Successfull'
        })
      }else{
        return res.json({
          success:101,
          message:'deletion unsuccessfull'
        })
      }
    })
  }
};
