const { getApplicantDetails,
        postApplicantData,
        getApplicantId,
        postApplicantMobile,
        postApplicantVehicle,
        checkApplicantVehicle,
        deleteApplicantPerson,
        checkApplicantMobile,
        postAdminFormData,
        getApplicantDetailsById,
        postRegisteredPerData,
        getRegisteredId,
        postRegMobileNo,
        checkRegMobileNo,
        checkRegVehicleNo,
        getMailDatailsForBranchUser,
        postRegVehicleNo,
        getApplicantCount,
        getRegCount,
        checkAdminEmail,
        getAdminId,
        getMailDatailsForAdmin
} = require("../services/applicant.js");
const { genSaltSync, hashSync} = require("bcrypt");
const createPassword = require("../../utils/passwordGenerate.js");
const { sendBranchUserMail,sendadminMail } = require("../modules/sendEmail.js");
require('dotenv').config()

module.exports = {
    getApplicantDetails: (req, res) => {
        getApplicantDetails((error, result) => {
            if (error) {
                res.json({
                success: 0,
                message: error,
                })
            }
            return res.json({
                success: 200,
                message: result,
            });
        })
    },

    postApplicantData: async (req, res) => {
        console.log('postApplicantData');
        const { A_email, A_fname, A_lname, A_dob, A_streetNo, A_city, A_street, E_fname, E_lname, E_relation, E_telephone, D_city, A_telephone, D_vehicle, D_vehicleNo } = req.body.values
        const date = new Date(A_dob).getFullYear().toString() + "-" + new Date(A_dob).getMonth().toString() + "-" + new Date(A_dob).getDate().toString();
        try {
            const checkMobile = await checkApplicantMobile(A_telephone);
            console.log(checkMobile)
            if (!checkMobile) {
                console.log('mobile is not duplicate');
                const checkVehicle = await checkApplicantVehicle(D_vehicleNo);
                if (!checkVehicle) {
                    console.log('vehicle is not duplicate');
                    const postApplicationResult = await postApplicantData(A_email, date, A_fname, A_lname, A_streetNo, A_city, A_street, E_fname, E_lname, E_relation, E_telephone, D_city)
                    if (postApplicationResult.affectedRows > 0) {
                        console.log('applicant data successfully inserted...');
                        const ApplicationId = await getApplicantId(A_email);
                        console.log(ApplicationId[0].Id);
                        const ApplicantMobile = await postApplicantMobile(ApplicationId[0].Id, A_telephone);
                        console.log(ApplicantMobile);
                            if (ApplicantMobile.affectedRows > 0) {
                                console.log('applicantMobile data successfully inserted...');
                                const ApplicantVehicle = await postApplicantVehicle(ApplicationId[0].Id, D_vehicle, D_vehicleNo);
                                if (ApplicantVehicle.affectedRows > 0) {
                                    console.log('applicantVehicle data successfully inserted...');
                                    return res.json({
                                    success: 200,
                                    message: "successfully Inserted"
                                    })
                                }else {
                                    deleteApplicantPerson(id, (error, result) => {
                                    if (error) {
                                        res.json({
                                        success: 0,
                                        message: error,
                                        })
                                    }
                                    return res.json({
                                        success: 200,
                                        message: result,
                                    })
                                    })
                                    console.log('applicantVehicle data not successfully inserted...');
                                }
                                } else {
                                console.log('applicantMobile data not successfully inserted...');
                                }
                            } else {
                                return res.json({
                                success: 101,
                                message: 'Form not successfully inserted....'
                                })
                            }
                            }
                            else {
                            console.log('duplicate vehicle number');
                            return res.json({
                                success: 101,
                                message: "duplicate vehicle number"
                            })
                            }
                        } else {
                            console.log('duplicate mobile number');
                            return res.json({
                            success: 101,
                            message: "duplicate mobile number"
                            })
                        }
                        } catch (error) {
                        return res.json({
                            success: 0,
                            message: error
                        })
                        }
    
    
        // const Id = req.params.Id;
        // console.log(Id);
        //   const applicantId = await getApplicantId(Id);
        // console.log(
        //   applicantId
        // );
    },

    postAdminData: async (req, res) => {
        let password=createPassword(12,true,true)
        let originalPassword = password
        console.log(password)
        const salt = genSaltSync(10);
        password = hashSync(password,salt); 
        const { N_fname, N_lname,N_admin, N_telephone, N_email, N_dob } = req.body.values;
        const date = new Date(N_dob).getFullYear().toString() + "-" + new Date(N_dob).getMonth().toString() + "-" + new Date(N_dob).getDate().toString();
        console.log(date);
        try {
            const checkEmail = await checkAdminEmail(N_email)
            console.log(checkEmail)
            console.log("email")
            if(!checkEmail){
                console.log("check email is not duplicate")
                const result = await postAdminFormData(N_fname, N_lname,N_admin, N_telephone, N_email,password);
                console.log(result);
                console.log("admin data")
                if(result.affectedRows>0){
                    const AdminId = await getAdminId(N_email)
                    console.log("admin id:"+AdminId[0].admin_Id)
                    getMailDatailsForAdmin(AdminId[0].admin_Id,(error,result) => {
                        if(error){
                            return res.json({
                            success:0,
                            message:"Get mail delails is not success"
                            })
                        }
                        
                        else if(result){
                            console.log(result)
                            console.log(originalPassword)
                            const{ admin_Id,FirstName,Email}= result[0]
                            const adminMail = {admin_Id,FirstName,Email,originalPassword}
                            sendadminMail(adminMail,(error,result)=>{
                            if(error){
                                return res.json({
                                success:0,
                                message:"Send mail is not successfull"
                                })
                            }
                            if(result){
                                console.log(result);
                            }
                            })
                        }
                        else{
                            res.json({
                            success:101,
                            message:"No admin data found"
                            })
                        }
                    })
                }else {
                    return res.json({
                    success: 101,
                    message: 'Form not successfully inserted....'
                    })
                }
            }else{
                return res.json({
                    success: 101,
                    message: "Duplicate Email."
                })
            }
            } catch (error) {
            return res.json({
                success: 0,
                message: "Catch error",
            })
        }
    },
    
    getApplicantDetailsById: (req, res) => {
        const id = req.params.applicantid;
        console.log(id)
        getApplicantDetailsById(id, (error, result) => {
            if (error) {
                res.json({
                success: 0,
                message: error,
                })
            } else {
                // Parse the formatted DOB string to a Date object if needed
                if (result && result.DOB) {
                result.DOB = result.DOB.toISOString().split('T')[0]; // Convert formatted DOB string to Date object
                }
            }
            return res.json({
                success: 200,
                message: result,
            })
        })
    },

    deleteApplicantPerson: (req, res) => {
        const id = req.params.applicantid;
        console.log(`applicantId is:${id}`)
        deleteApplicantPerson(id, (error, result) => {
            if (error) {
                res.json({
                success: 0,
                message: error,
                })
            }
            return res.json({
                success: 200,
                message: result,
            })
        })
    },

    postRegisteredData: async (req, res) => {
        let password=createPassword(12,true,true)
        let originalPassword = password
        console.log(password)
        const salt = genSaltSync(10);
        password = hashSync(password,salt);
        const applicantId=req.params.applicationId;
        console.log( password)
      //   console.log('yes');
        //const {values} = req.body;
        const { BranchLocation, City, DOB, E_ContactNo, E_FirstName, E_LastNane, E_Relationship, Email, FirstName, LastName, MobileNo, StreetNo, Vehice_Type, VehicleNo, Street } = req.body.values
        try {
            console.log(BranchLocation);
            const checkRegNo = await checkRegVehicleNo(VehicleNo);
            if (!checkRegNo) {
                const checkRegMobile = await checkRegMobileNo(MobileNo);
                if (!checkRegMobile) {
                const postRegisteredData = await postRegisteredPerData(BranchLocation, City, DOB, E_ContactNo, E_FirstName, E_LastNane, E_Relationship, Email, FirstName, LastName, StreetNo, Street,password)
                //console.log("postR0egisteredData");
                console.log(password);
                if (postRegisteredData.affectedRows > 0) {
                    console.log(postRegisteredData);
                    const RegisteredId = await getRegisteredId(Email);
                    console.log("registerde id:", RegisteredId[0].BranchUser_id)
                    console.log('branchuser data successfully inserted....')
                    const RegMobileNo = await postRegMobileNo(RegisteredId[0].BranchUser_id, MobileNo);
                    if (RegMobileNo.affectedRows > 0) {
                    console.log("Reg mobile:", RegMobileNo)
                    console.log('mobile no successfully inserted....')
                    const RegVehicleNo = await postRegVehicleNo(RegisteredId[0].BranchUser_id, Vehice_Type, VehicleNo);
                    if (RegVehicleNo.affectedRows > 0) {
                        console.log('vehicle details successfully inserted....')
                        console.log("YES I AM")
                        console.log(`applicant id:${applicantId}`)
                        deleteApplicantPerson(applicantId, (error, result) => {
                        if (error) {
                            res.json({
                            success: 0,
                            message: error,
                            })
                        }else if(result.affectedRows>0){
                            console.log(`Registered id is : ${RegisteredId[0].BranchUser_id}`)
                            getMailDatailsForBranchUser(RegisteredId[0].BranchUser_id,(error,result)=>{
                            if(error){
                                return res.json({
                                success:0,
                                message:error
                                })
                            }
                            
                            else if(result){
                                console.log(result)
                                console.log(originalPassword)
                                const{ BranchUser_id,FirstName,Email,branchLocation}= result[0]
                                const branchuserMail = {BranchUser_id,FirstName,Email,branchLocation,originalPassword}
                                sendBranchUserMail(branchuserMail,(error,result)=>{
                                if(error){
                                    return res.json({
                                    success:0,
                                    message:error
                                    })
                                }
                                if(result){
                                    console.log(result);
                                }
                                })
                            }
                            else{
                                res.json({
                                success:101,
                                message:"No branch user data found"
                                })
                            }
                            })
                        }
                        })
                    }
                    else {
                        deleteApplicantPerson(applicantId, (error, result) => {
                        if (error) {
                            res.json({
                            success: 0,
                            message: error,
                            })
                            return res.json({
                            success: 200,
                            message: " Branch user Registration failed ",
                            })
                        } 
                        })
                    }
                    } else {
                    console.log('mobile details insertion unsuccessfull')
                    }
                }
                else {
                    return res.json({
                    success: 101,
                    message: 'Form not successfully inserted....'
                    })
                }
                } else {
                console.log('duplicate vehicle number');
                return res.json({
                    success: 101,
                    message: "duplicate vehicle number"
                })
                }
            } else {
                console.log('duplicate mobile number');
                return res.json({
                success: 101,
                message: "duplicate mobile number"
                })
            }
            }
            catch (error) {
            return res.json({
                success: 0,
                message: error
            })
            }
    },

    getperonCount: async (req,res) => {
        try{
            const regCount = await getRegCount();
            const applicantCount = await getApplicantCount();
        
            return res.json({
                success:1,
                message:"get count Successfull",
                app:applicantCount,
                reg:regCount,
            })
        
        
            }catch{
            return res.json({
                success:0,
                message: 'Error fetching counts',
            })
        }
    },

    getperonCount: async (req,res) => {
        try{
            const regCount = await getRegCount();
            const applicantCount = await getApplicantCount();
        
            return res.json({
                success:1,
                message:"get count Successfull",
                app:applicantCount,
                reg:regCount,
            })
            }catch{
            return res.json({
                success:0,
                message: 'Error fetching counts',
            })
        }
    },
}