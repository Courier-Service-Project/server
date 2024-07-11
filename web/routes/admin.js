const route = require("express").Router();
const {
  AdminLogin,
  AddAdmin,
  GetAccountInfo,
  ChangeUserName,
  ChangeContact,
  CheckPrePassword,
  checkForgetEmail,
  CheckOTP,
  ChangePassword,
  getAdminprofileDetails,
  getAdminprofileDetailsById,
  ChangeforgotPassword,
  updateProfile,
  deleteProfileImage
} = require("../controllers/admin.js");

route.post("/", AdminLogin);
route.post("/addAdmin", AddAdmin);
route.get("/getinfo", GetAccountInfo);
route.post("/changeUsername", ChangeUserName);
route.post("/changeContact", ChangeContact);
route.post("/CheckPrePassword", CheckPrePassword);
route.post("/ChangePassword", ChangePassword);
route.get("/AdminprofileDetails", getAdminprofileDetails);
route.get("/AdminprofileDetailsById/:id", getAdminprofileDetailsById);
route.post("/fogotemail", checkForgetEmail);
route.post("/checkopt", CheckOTP);
route.post("/forgotChange", ChangeforgotPassword);
route.patch("/updateProfile/:id",updateProfile);
route.delete("/deleteProfileImage/:id",deleteProfileImage)

module.exports = route;
