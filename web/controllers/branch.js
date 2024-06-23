const {getBranchLocation} = require("../services/branch.js")


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
    }
}