const pool = require("../../config/dbConfig.js");

module.exports = {
  getBranchLocation: (callBack) => {
    pool.query(
      `SELECT branchLocation FROM Branch`,
      (error, results, feilds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getBranchDetails: (callBack) => {
    pool.query(
      `SELECT branchLocation,branchDistrict,branchProvince
          FROM Branch`,
      (error, results, feilds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  createNewBranch: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Branch (branchLocation,branchDistrict,branchProvince) values(?,?,?)`,
        [data.br_location, data.br_district, data.br_province],
        (error, results, feilds) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  getDistance: (from, to, callBack) => {
    pool.query(
      `SELECT Price FROM Distance where (distance1 = ? and distance2 = ?) or (distance1 = ? and distance2 = ?)`,
      [from, to, to, from],
      (error, results, feilds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
};
