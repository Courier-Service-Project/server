const pool = require("../../config/dbConfig.js");
module.exports={
    getApplicantDetails: (callback) => {
        pool.query(
            `SELECT A.Id AS id,A.FirstName AS FirstName,A.City AS City,A.BranchLocation AS BranchLocation,V.Vehice_Type AS Vehice_Type,A.LastName AS LastName,A.DOB AS DOB,A.Email AS Email,A.StreetNo AS StreetNo,A.Street AS Street,A.E_FirstName AS E_FirstName,A.E_LastNane AS E_LastNane,A.E_ContactNo AS E_ContactNo,A.E_Relationship AS E_Relationship,M.MobileNo AS MobileNo,V.VehicleNo AS VehicleNo
            FROM Applicant A,ApplicantVehicle V,ApplicantMobile M
            WHERE A.Id=V.Id AND  A.Id=M.Id
            ORDER BY id ASC`,
            [],
            (error,results,feilds)=>{
                if(error){
                return callback(error);
                }
                return callback(null,results)
            }
            )
        },
        postApplicantData:(A_email,A_dob,A_fname,A_lname,A_streetNo,A_city,A_street,E_fname,E_lname,E_relation,E_telephone,D_city)=>{
            console.log(A_dob);
            return new Promise((resolve,reject)=>{
                pool.query(`INSERT INTO Applicant(FirstName,LastName,DOB,Email,StreetNo,Street,City,BranchLocation,E_FirstName,E_LastNane,E_ContactNo,E_Relationship)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [A_fname,A_lname,A_dob,A_email,A_streetNo,A_street,A_city,D_city,E_fname,E_lname,E_telephone,E_relation],
                (error,result,feilds)=>{
                    if(error){
                    reject(error)
                    }
                    resolve(result)
                })
            })
        },
        getApplicantId: (email) => {
            return new Promise((resolve,reject)=>{
                pool.query(`SELECT Id FROM Applicant WHERE Email=?`,[email],(error,result,feilds)=>{
                    if(error){
                    reject(error)
                    }
                    resolve(result);
                })
            })
        },
        postApplicantMobile: (ApplicantId,A_telephone) => {
            return new Promise((resolve,reject)=>{
            pool.query(`INSERT INTO ApplicantMobile(Id,MobileNo) VALUES(?,?)`,
                [ApplicantId,A_telephone],(error,result,feilds) =>{
                if(error){
                    reject(error)
                }
                resolve(result);
                }
                )
            })
        },
        postApplicantVehicle: (ApplicantId,D_vehicle,D_vehicleNo) => {
            return new Promise ((resolve,reject)=>{
                pool.query(`INSERT INTO ApplicantVehicle(VehicleNo,Vehice_Type,Id) VALUES(?,?,?)`,
                    [D_vehicleNo,D_vehicle,ApplicantId],(error,result,feilds)=>{
                    if(error){
                        reject(error)
                    }
                    resolve(result);
                    }
                )
            })
        },
        checkApplicantMobile: (A_telephone) => {
            console.log(A_telephone)
            return new Promise((resolve,reject)=>{
                pool.query(`SELECT 1 FROM ApplicantMobile WHERE MobileNo = ? LIMIT 1`,
                [A_telephone],(error,result,feilds) =>{
                    if(error){
                    reject(error)
                    }
                    console.log(result)
                    resolve(result.length > 0)
                })
            })    
        },
        checkApplicantVehicle: (D_vehicleNo) => {
            console.log(D_vehicleNo);
            return new Promise((resolve,reject)=>{
                pool.query(`SELECT 1 FROM ApplicantVehicle WHERE VehicleNo = ? LIMIT 1`,
                    [D_vehicleNo],(error,result,feilds)=>{
                    if(error){
                        reject(error)
                    }
                    console.log(result)
                    resolve(result.length > 0)
                    }
                )
            })
        },
        deleteApplicantPerson: (id,callback) => {
            console.log('IN THE FUNCTION');
            console.log(`applicsnt id is ${id}`)
            pool.query(
                `DELETE FROM Applicant WHERE Id=?`,
                [id],
                (error,results,feilds)=>{
                    if(error){
                    console.log(error)
                    return callback(error);
                    }
                    console.log(`BACKEND RESULTS ${results}`)
                    return callback(null,results)
                }
                )
        },
        postAdminFormData: (N_fname, N_lname,N_admin, N_telephone, N_email,N_dob,N_streetNo,N_street,N_city) => {
            //console.log(N_dob);
            console.log("im here...")
            return new Promise((resolve,reject)=>{
                pool.query(`INSERT INTO Admin(FirstName,LastName,type,Tele,Email,DOB,Street_No,Street,City,Status) VALUES(?,?,?,?,?,?,?,?,?,?)`,
                [N_fname, N_lname,N_admin, N_telephone, N_email,N_dob,N_streetNo,N_street,N_city,'NR'],
                (error,result,feilds)=>{
                    if(error){
                    reject (error)
                    }
                    resolve (result);
                }
                )
            })
        },
        getApplicantDetailsById: (id,callback) => {
            console.log(id)
            pool.query(
                `SELECT A.Id AS id,A.FirstName AS FirstName,A.City AS City,A.BranchLocation AS BranchLocation,V.Vehice_Type AS Vehice_Type,A.LastName AS LastName,DATE(A.DOB) AS DOB,A.Email AS Email,A.StreetNo AS StreetNo,A.Street AS Street,A.E_FirstName AS E_FirstName,A.E_LastNane AS E_LastNane,A.E_ContactNo AS E_ContactNo,A.E_Relationship AS E_Relationship,M.MobileNo AS MobileNo,V.VehicleNo AS VehicleNo
                FROM Applicant A,ApplicantVehicle V,ApplicantMobile M
                WHERE A.Id=V.Id AND  A.Id=M.Id AND A.Id=?`,
                [id],
                (error,results,feilds)=>{
                    if(error){
                    return callback(error);
                    }
                    return callback(null,results[0])
                }
            )
        },
        postRegisteredPerData:(BranchLocation,City,DOB,E_ContactNo,E_FirstName,E_LastNane,E_Relationship,Email,FirstName,LastName,StreetNo,Street,password)=>{
            console.log(DOB);
            return new Promise((resolve,reject)=>{
                pool.query(`INSERT INTO BranchUser(FirstName,LastName,StreetNo,Street,City,Password,Email,NewUser,branchLocation,DOB,E_FirstName,E_LastNane,E_ContactNo,E_Relationship)  VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
                    [FirstName,LastName,StreetNo,Street,City,password,Email,'T',BranchLocation,DOB,E_FirstName,E_LastNane,E_ContactNo,E_Relationship],
                (error,result,feilds)=>{
                    if(error){
                    reject(error)
                    }
                    resolve(result)
                })
            })
        },
        getRegisteredId: (Email) => {
            return new Promise((resolve,reject) => {
                pool.query(`SELECT BranchUser_id FROM BranchUser WHERE Email=?`,[Email],
                    (error,result,feilds)=>{
                    if(error){
                        reject(error)
                    }
                    resolve(result)
                    }
                )
            })
        },
        postRegMobileNo:(RegisteredId,MobileNo) => {
            return new Promise((resolve,reject) =>{
                pool.query(`INSERT INTO BranchUserMobile(BranchUser_id,Mobile) VALUES (?,?)`,
                    [RegisteredId,MobileNo],
                    (error,result,feilds)=>{
                    if(error){
                        reject(error)
                    }
                    resolve(result)
                    }
                )
            })
        },
        postRegVehicleNo:(RegisteredId,Vehice_Type,VehicleNo) => {
            return new Promise ((resolve,reject) => {
                pool.query(`INSERT INTO Vehicle(Vehicle_NO,Type,BranchUser_id) VALUES (?,?,?)`,
                    [VehicleNo,Vehice_Type,RegisteredId],
                    (error,result,feilds)=>{
                    if(error){
                        reject(error)
                    }
                    resolve(result)
                    }
                )
            }
            )
        },
        checkRegMobileNo:(MobileNo) => {
            console.log('inside mobile no');
            return new Promise((resolve,reject) => {
                pool.query(`SELECT 1 FROM BranchUserMobile WHERE Mobile=? LIMIT 1`,
                    [MobileNo],
                    (error,result,feilds) =>{
                    if(error){
                        reject(error)
                    }
                    console.log(result.length);
                    resolve(result.length>0)
                    }
                )
             })
        },
        checkRegVehicleNo: (VehicleNo) =>{
            console.log('inside vehicle no');
            return new Promise((resolve,reject) => {
                pool.query(`SELECT 1 FROM Vehicle WHERE Vehicle_NO=? LIMIT 1`,
                    [VehicleNo],
                    (error,result,feilds) => {
                    if(error){
                        reject(error)
                    }
                    console.log(result.length);
                    resolve(result.length>0)
                    }
                )
            })
        },
        getMailDatailsForBranchUser: (BranchUser_id,callback) => {
            pool.query(`SELECT BranchUser_id,FirstName,Email,branchLocation
                FROM BranchUser WHERE BranchUser_id=?`,
                [BranchUser_id],(error,result,feilds) => {
                    if(error){
                    return callback(error)
                    }
                    console.log(result);
                    return callback(null,result)
                }
            )
        },
        getApplicantCount: () => {
            return new Promise((resolve,reject)=>{
                pool.query(`SELECT COUNT(Id) AS applicantCount
                    FROM Applicant`,
                    [],
                    (error,result,feilds)=>{
                    if(error){
                        reject(error)
                    }
                    resolve(result[0].applicantCount);
                })
            })
        },
        getRegCount:() => {
            return new Promise((resolve,reject)=>{
                pool.query(`SELECT COUNT(BranchUser_id) AS regPerCount
                FROM BranchUser`,
                [],
                (error,result,feilds)=>{
                    if(error){
                    reject(error);
                    }
                    resolve(result[0].regPerCount);
                })
            })
        },
        
        checkAdminEmail: (N_email) => {
            console.log(N_email)
            return new Promise((resolve,reject) => {
                pool.query(`SELECT 1 FROM Admin WHERE Email=? LIMIT 1`,
                [N_email],(error,result,feilds) =>{
                    if(error){
                        reject(error)
                    }
                    console.log(result.length)
                    resolve(result.length>0)
                }
                )
            })
        },
        getAdminId: (Email) => {
            return new Promise((resolve,reject) => {
                pool.query(`SELECT admin_Id FROM Admin WHERE Email=?`,[Email],
                    (error,result,feilds)=>{
                    if(error){
                        reject(error)
                    }
                    resolve(result)
                    }
                )
            })
        },
        getAdminApplicantData:(callback)=>{
            pool.query(
                `SELECT admin_Id,FirstName,LastName,type,Tele,Email,DOB,Street_No,Street,City
                FROM Admin
                WHERE Status='NR'
                ORDER BY admin_Id ASC`,
                [],
                (error,results,feilds)=>{
                    if(error){
                    return callback(error);
                    }
                    return callback(null,results)
                }
                )
        },

        getAdminDataById:(admin_Id,callback) => {
            pool.query(
                `SELECT admin_Id,FirstName,LastName,type,Tele,Email,DOB,Street_No,Street,City
                FROM Admin
                WHERE admin_Id=?`,
                [admin_Id],
                (error,results,feilds)=>{
                    if(error){
                    return callback(error);
                    }
                    return callback(null,results[0])
                }
            )
        },


        deleteAdminData: (admin_Id,callback) => {
            console.log(`admin id is ${admin_Id}`)
            pool.query(
                `DELETE FROM Admin WHERE admin_Id=?`,
                [admin_Id],
                (error,results,feilds)=>{
                    if(error){
                    console.log(error)
                    return callback(error);
                    }
                    console.log(`BACKEND RESULTS ${results}`)
                    return callback(null,results)
                }
                )
        },

        updateAdminsStatus : (admin_Id,password) => {
            console.log("i am dil...")
            console.log(admin_Id)
            console.log(password)
            return new Promise((resolve, reject) => {
                pool.query(`UPDATE Admin set Status='R' , Password= ? WHERE admin_Id = ?`,
                    [password,admin_Id],
                    (error, result, fields) => {
                    if (error) {
                        reject(error);
                    }
                    resolve(result);
                });
            });
        },

        getCurrentAdminStatus : (admin_Id) => {
            return new Promise((resolve, reject) => {
                pool.query(`SELECT Status FROM Admin WHERE admin_Id = ?`, [admin_Id], (error, result) => {
                    if (error) {
                        reject(error);
                    } else if (result.length > 0) {
                        resolve(result[0]);
                    } else {
                        resolve({ Status: null });
                    }
                });
            });
        },

        getMailDatailsForAdmin: (admin_Id,callback) => {
                pool.query(`SELECT admin_Id,FirstName,Email
                    FROM Admin WHERE admin_Id=?`,
                    [admin_Id],(error,result,feilds) => {
                        if(error){
                            return callback(error)
                        }
                        console.log(".........."+result);
                        return callback(null,result)
                    }
                )
        }


    }