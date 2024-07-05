const webApplicant = require("express").Router();
const { getApplicantDetails, 
        postApplicantData,
        postAdminData,
        getApplicantDetailsById,
        deleteApplicantPerson,
        postRegisteredData,
        getperonCount,
        getAdminApplicantData,
        getAdminDataById,
        deleteAdminData,
        updateAdminStatus} = require("../controllers/applicant.js");

webApplicant.get("/applicantDetails",getApplicantDetails);
webApplicant.post("/postApplicantData",postApplicantData);
webApplicant.post("/postAdminData",postAdminData)
webApplicant.get("/applicantDetailsById/:applicantid",getApplicantDetailsById);
webApplicant.delete("/applicantPersonDelete/:applicantid",deleteApplicantPerson);
webApplicant.post("/postregistereddata/:applicationId",postRegisteredData);
webApplicant.get("/peronCount",getperonCount);
webApplicant.get("/adminApplicantData",getAdminApplicantData);
webApplicant.get("/adminDataById/:admin_Id",getAdminDataById);
webApplicant.delete("/adminDataDelete/:admin_Id",deleteAdminData);
webApplicant.patch("/updateAdminStatus/:admin_Id",updateAdminStatus)


    module.exports = webApplicant;