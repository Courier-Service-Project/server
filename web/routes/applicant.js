const webApplicant = require("express").Router();
const { getApplicantDetails, 
        postApplicantData,
        postAdminData,
        getApplicantDetailsById,
        deleteApplicantPerson,
        postRegisteredData,
        getperonCount} = require("../controllers/applicant.js");

webApplicant.get("/applicantDetails",getApplicantDetails);
webApplicant.post("/postApplicantData",postApplicantData);
webApplicant.post("/postAdminData",postAdminData)
webApplicant.get("/applicantDetailsById/:applicantid",getApplicantDetailsById);
webApplicant.delete("/applicantPersonDelete/:applicantid",deleteApplicantPerson);
webApplicant.post("/postregistereddata/:applicationId",postRegisteredData);
webApplicant.get("/peronCount",getperonCount);


    module.exports = webApplicant;