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
}