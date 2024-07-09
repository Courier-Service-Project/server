const pool = require("../../config/dbConfig.js");
const admin = require("../controllers/admin.js");

module.exports = {
  CheckUsernamePassword: (username, callback) => {
    // console.log(username)
    pool.query(
      `SELECT password,admin_Id,type,FirstName From Admin WHERE Email=?`,
      [username],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  AddAdmin: (data, callback) => {
    pool.query(
      `insert into Admin (FirstName,Password,LastName,Tele,Email) values(?,?,?,?,?)`,
      [data.firstname, data.password, data.lastname, data.tele, data.username],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  GetAccountInfo: (id, callback) => {
    pool.query(
      `select FirstName,LastName,Tele,Email from Admin  where (admin_Id = ?)`,
      [id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  ChangeUserName: (data, callback) => {
    pool.query(
      `Update Admin set FirstName=?,LastName=? where (admin_Id = ?)`,
      [data.fname, data.lname, data.adminID],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  ChangeContact: (data, callback) => {
    pool.query(
      `Update Admin set Tele=?,Email=? where (admin_Id = ?)`,
      [data.tele, data.email, data.adminID],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  CheckPrePassword: (id, callback) => {
    pool.query(
      `Select Password from Admin where (admin_Id = ?)`,
      [id],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  ChangePassword: (data, callback) => {
    pool.query(
      `Update Admin set Password=? where (admin_Id = ?)`,
      [data.newPassword, data.adminID],
      (error, result, feilds) => {
        if (error) {
          return callback(error);
        }
        return callback(null, result);
      }
    );
  },
  getAdminprofileDetails: (callBack) => {
    pool.query(
      `SELECT a.admin_Id, a.FirstName, a.LastName, a.type, a.Tele, a.Email, am.mobile
                    FROM Admin a
                    LEFT JOIN AdminMobile am ON a.admin_Id = am.admin_Id`,
      [],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getAdminprofileDetailsById: (id, callBack) => {
    pool.query(
      `SELECT a.admin_Id, a.FirstName, a.LastName, a.type, a.Tele, a.Email, am.mobile
                  FROM Admin a
                  LEFT JOIN AdminMobile am ON a.admin_Id = am.admin_Id
                  WHERE a.admin_Id = ?`,
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  saveForgotOTP: (otp, email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Otp (Email,Otp) values(?,?)`,
        [email, otp],
        (error, results, feilds) => {
          if (error) {
            return reject(error);
          }
          return resolve(results);
        }
      );
    });
  },
  CheckforgotUsernamePassword: (username) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT password,admin_Id From Admin WHERE Email=?`,
        [username],
        (error, result, feilds) => {
          if (error) {
            console.log("ero");
            return reject(error);
          }

          return resolve(result);
        }
      );
    });
  },
  CheckOTP: (email, callBack) => {
    pool.query(
      `SELECT Otp from Otp where Email = ?`,
      [email],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
