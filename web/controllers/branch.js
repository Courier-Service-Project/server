const {getBranchLocation,getBranchDetails,createNewBranch} = require("../services/branch.js")


module.exports = {
    getBranchLocation:(req,res)=>{
        getBranchLocation((error,results)=>{
            if (error){
                res.json({
                    success: 0,
                    message: error,
                    message2: "Error getBranchLocation",
                  });  
            }
            if(results){
                const branchLocations = results.map(row => row.branchLocation);
                res.json({
                    success: 1,
                    message: "Success getBranchLocation",
                    Data:branchLocations,
                  }); 
            }
        })
    },

    getBranchDetails: (req, res) => {
        getBranchDetails((error, results) => {
          if (error) {
            res.json({
              success: 0,
              message: error,
            });
          }
          if (results.length == 0) {
            res.json({
              success: 101,
              message: "no register branch",
            });
          } else if (results) {
            res.json({
              success: 200,
              message: results,
            });
          }
        });
    },

    createNewBranch: async (req, res) => {  
        const data = req.body;
      
        try {
            await createNewBranch(data);
            return res.json({
                success:1,
                message: "Successfull Save",
            })
    
        } catch (error) {
          return res.json({
            success: 0,
            message: error,
          });
        }
    }

};