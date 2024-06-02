const {CheckUsernamePassword,AddAdmin,GetAccountInfo,ChangeUserName,ChangeContact,CheckPrePassword,ChangePassword} = require("../services/admin.js");
const { genSaltSync, hashSync, compareSync } = require("bcrypt");

module.exports = {
AdminLogin: (req, res) => {
    CheckUsernamePassword(req.body.userName, (err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: "error",
        });
      }
      if (result.length == 0) {
        return res.json({
            success: 0,
            message: "invalid username",
          });
      }

      if (result) {
 
          if(compareSync(req.body.password, result[0].password)){
            return res.json({
              success: 1,
              message: "correct password",
            })
          }
          else{
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
    const data = req.body
    data.password = hashSync(data.password, salt);
    AddAdmin(data,(err, result) => {
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
    const id = req.query.adminID
    GetAccountInfo(id,(err, result) => {
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
    const data =req.body
   
    ChangeUserName(data,(err, result) => {
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
    const data =req.body
    ChangeContact(data,(err, result) => {
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
    const id =req.body.adminID
    const Pass =req.body.Password

    CheckPrePassword(id,(err, result) => {
      if (err) {
        return res.json({
          success: 0,
          message: err,
        });
      }
      if (result) {
        if(compareSync(Pass, result[0].Password)){
          return res.json({
            success: 1,
            message: "correct password",
          })
        }
        else{
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
    const data = req.body
    console.log(data)
    data.newPassword = hashSync(data.newPassword, salt);
    data.comPassword= hashSync(data.comPassword, salt);

     if(data.newPassword==data.comPassword){
              ChangePassword(data,(err, result) => {
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
                })
              } 
            });
     }else{
      return res.json({
                 success: 1,
                message: "Not match password",
            })
     }
    
   },
}