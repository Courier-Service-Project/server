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
        getMailDatailsForAdmin,
        getAdminApplicantData,
        getAdminDataById,
        deleteAdminData,
        updateAdminsStatus
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
        //console.log('postApplicantData');
        const { A_email, A_fname, A_lname, A_dob, A_streetNo, A_city, A_street, E_fname, E_lname, E_relation, E_telephone, D_city, A_telephone, D_vehicle, D_vehicleNo } = req.body.values
        const date = new Date(A_dob).getFullYear().toString() + "-" + new Date(A_dob).getMonth().toString() + "-" + new Date(A_dob).getDate().toString();
        try {
            const checkMobile = await checkApplicantMobile(A_telephone);
            //console.log(checkMobile)
            if (!checkMobile) {
                //console.log('mobile is not duplicate');
                const checkVehicle = await checkApplicantVehicle(D_vehicleNo);
                if (!checkVehicle) {
                    //console.log('vehicle is not duplicate');
                    const postApplicationResult = await postApplicantData(A_email, date, A_fname, A_lname, A_streetNo, A_city, A_street, E_fname, E_lname, E_relation, E_telephone, D_city)
                    if (postApplicationResult.affectedRows > 0) {
                        //console.log('applicant data successfully inserted...');
                        const ApplicationId = await getApplicantId(A_email);
                        //console.log(ApplicationId[0].Id);
                        const ApplicantMobile = await postApplicantMobile(ApplicationId[0].Id, A_telephone);
                        //console.log(ApplicantMobile);
                            if (ApplicantMobile.affectedRows > 0) {
                                //console.log('applicantMobile data successfully inserted...');
                                const ApplicantVehicle = await postApplicantVehicle(ApplicationId[0].Id, D_vehicle, D_vehicleNo);
                                if (ApplicantVehicle.affectedRows > 0) {
                                    //console.log('ApplicantVehicle data successfully inserted...');
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
                                    //console.log('ApplicantVehicle data not successfully inserted...');
                                }
                                } else {
                                //console.log('ApplicantMobile data not successfully inserted...');
                                return res.json({
                                    success:101,
                                    message:'ApplicantMobile data not successfully inserted...'
                                })
                                }
                            } else {
                                return res.json({
                                success: 101,
                                message: 'Form not successfully inserted....'
                                })
                            }
                            }
                            else {
                            //console.log('duplicate vehicle number');
                            return res.json({
                                success: 101,
                                message: "Duplicate vehicle number"
                            })
                            }
                        } else {
                            //console.log('duplicate mobile number');
                            return res.json({
                            success: 101,
                            message: "Duplicate mobile number"
                            })
                        }
                        } catch (error) {
                        return res.json({
                            success: 0,
                            message: error.message
                        })
                        }
    
    
        // const Id = req.params.Id;
        // console.log(Id);
        //   const applicantId = await getApplicantId(Id);
        // console.log(
        //   applicantId
        // );
    },
    
    getApplicantDetailsById: (req, res) => {
        const id = req.params.applicantid;
        //console.log("gggggg"+id)
        getApplicantDetailsById(id, (error, result) => {
           
            if (error) {
                console.log("error")
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
            if (result === undefined){
                return res.json({ 
                    success: 3,
                    message: result,
                }) 
            }
            return res.json({ 
                success: 200,
                message: result,
            })
        })
    },

    deleteApplicantPerson: (req, res) => {
        const id = req.params.applicantid;
        //console.log(`applicantId is:${id}`)
        deleteApplicantPerson(id, (error, result) => {
            if (error) {
                res.json({
                success: 0,
                message: error,
                })
            }
            if(result)
            return res.json({
                success: 200,
                message: result,
            })
        })
    },

    postRegisteredData: async (req, res) => {
        let password=createPassword(4,true,true)
        let originalPassword = password
        //console.log(password)
        const salt = genSaltSync(10);
        password = hashSync(password,salt);
        const applicantId=req.params.applicationId;
        //console.log( password)
                    //   console.log('yes');
                    //const {values} = req.body;
        const { BranchLocation, City, DOB, E_ContactNo, E_FirstName, E_LastNane, E_Relationship, Email, FirstName, LastName, MobileNo, StreetNo, Vehice_Type, VehicleNo, Street } = req.body.values
        try {
            //console.log(BranchLocation);
            const checkRegNo = await checkRegVehicleNo(VehicleNo);
            if (!checkRegNo) {
                const checkRegMobile = await checkRegMobileNo(MobileNo);
                if (!checkRegMobile) {
                const postRegisteredData = await postRegisteredPerData(BranchLocation, City, DOB, E_ContactNo, E_FirstName, E_LastNane, E_Relationship, Email, FirstName, LastName, StreetNo, Street,password)
                //console.log("postR0egisteredData");
                console.log(password);
                if (postRegisteredData.affectedRows > 0) {
                    //console.log(postRegisteredData);
                    const RegisteredId = await getRegisteredId(Email);
                    // console.log("registerde id:", RegisteredId[0].BranchUser_id)
                    // console.log('branchuser data successfully inserted....')
                    const RegMobileNo = await postRegMobileNo(RegisteredId[0].BranchUser_id, MobileNo);
                    if (RegMobileNo.affectedRows > 0) {
                    // console.log("Reg mobile:", RegMobileNo)
                    // console.log('mobile no successfully inserted....')
                    const RegVehicleNo = await postRegVehicleNo(RegisteredId[0].BranchUser_id, Vehice_Type, VehicleNo);
                    if (RegVehicleNo.affectedRows > 0) {
                        // console.log('vehicle details successfully inserted....')
                        // console.log("YES I AM")
                        // console.log(`applicant id:${applicantId}`)
                        deleteApplicantPerson(applicantId, (error, result) => {
                        if (error) {
                            res.json({
                            success: 0,
                            message: error,
                            })
                        }else if(result.affectedRows>0){
                            //console.log(`Registered id is : ${RegisteredId[0].BranchUser_id}`)
                            getMailDatailsForBranchUser(RegisteredId[0].BranchUser_id,(error,result)=>{
                            if(error){
                                return res.json({
                                success:0,
                                message:error
                                })
                            }
                            
                            else if(result){
                                // console.log(result)
                                // console.log(originalPassword)
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
                                    //console.log(result);
                                    return res.json({
                                        success:200,
                                        message:"Mail Successfully sent."
                                    })
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
                            message: "Branch user Registration successfully.",
                            })
                        } 
                        })
                    }
                    } else {
                    //console.log('mobile details insertion unsuccessfull')
                    return res.json({
                        success:101,
                        message:'mobile details insertion unsuccessfull'
                    })
                    }
                }
                else {
                    return res.json({
                    success: 101,
                    message: 'Form not successfully inserted....'
                    })
                }
                } else {
                //console.log('duplicate vehicle number');
                return res.json({
                    success: 101,
                    message: "duplicate vehicle number"
                })
                }
            } else {
                //console.log('duplicate mobile number');
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

    getAdminApplicantData: (req,res) => {
        getAdminApplicantData((error, result) => {
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

    getAdminDataById: (req, res) => {
        const admin_Id = req.params.admin_Id;
        //console.log(admin_Id)
        getAdminDataById(admin_Id, (error, result) => {
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
            if (result === undefined){
                return res.json({ 
                    success: 3,
                    message: result,
                }) 
            }
            return res.json({
                success: 200,
                message: result,
            })
        })
    },

    deleteAdminData: (req, res) => {
        const admin_Id = req.params.admin_Id;
        deleteAdminData(admin_Id, (error, result) => {
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

    updateAdminStatus: (req, res) => {
        const admin_Id = req.params.admin_Id;
        updateAdminStatus(admin_Id, (error, results) => {
          if (error) {
            res.json({
              success: 0,
              message: error,
            });
          } else if (results.affectedRows > 0) {
            res.json({
              success: 200,
              message: "Admin Registered Successfully",
            });
          } else {
            res.json({
              success: 101,
              message: "Try Again",
            });
          }
        });
      },

    updateAdminStatus : async (req,res) => {
        let password=createPassword(4,true,true)
        let originalPassword = password
        //console.log(password)
        const salt = genSaltSync(10);
        password = hashSync(password,salt); 
        const admin_Id = req.params.admin_Id;
    try {
        //console.log("admin id" +admin_Id)
        const adminStatus = await updateAdminsStatus(admin_Id,password);
        //console.log(adminStatus.affectedRows)
        if (adminStatus.affectedRows>0) {
            //console.log("i am in the if")
                //const Email = req.body.Email;
                //const AdminId = await getAdminId(Email);
            //console.log("AdminID...")
            //console.log("AdminId:" +admin_Id)
            getMailDatailsForAdmin(admin_Id,(error,result)=>{
                if(error){
                    return res.json({
                        success:0,
                        message:"Get mail details is not success"
                    })
                }
                else if(result){
                    //console.log(result)
                    //console.log(originalPassword)
                    const { admin_Id, FirstName, Email } = result[0];
                    const adminMail = { admin_Id, FirstName, Email, originalPassword };
                      // const adminMail = {admin_Id,FirstName,Email}
                    //console.log("admin maill...:" + result[0].FirstName)
                    sendadminMail(adminMail,(error,result) => {
                        if(error){
                            return res.json({
                                success:0,
                                message:"Send mail is not successfull"
                            })

                        }
                        if(result){
                            //console.log(result[0])
                            return res.json({
                                success:200,
                                message: "Mail successfully send"
                            })

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
        } else {
            res.json({
                success: 101,
                message: "Form not successfully inserted.",
            });
        }
    } catch (error) {
        res.json({
            success: 0,
            message: "Network error. Please try again.",
        });
    }
},


postAdminData: async (req, res) => {
    const { N_fname, N_lname,N_admin, N_telephone, N_email,N_dob,N_streetNo,N_street,N_city } = req.body.values;
    const date = new Date(N_dob).getFullYear().toString() + "-" + new Date(N_dob).getMonth().toString() + "-" + new Date(N_dob).getDate().toString();
    //console.log(date);
    try {
        const checkEmail = await checkAdminEmail(N_email)
        // console.log(checkEmail)
        // console.log("email")
        if(!checkEmail){
            //console.log("check email is not duplicate")
            const result = await postAdminFormData(N_fname, N_lname,N_admin, N_telephone, N_email,N_dob,N_streetNo,N_street,N_city);
            // console.log(result);
            // console.log("admin data");
                return res.json({
                success: 200,
                message: "Successfully inserted"
                });
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


}