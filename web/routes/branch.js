const route = require("express").Router();

const {getBranchLocation,getBranchDetails,createNewBranch} = require("../controllers/branch.js");

route.get("/",getBranchLocation);
route.get("/branchDetails",getBranchDetails);
route.post("/createNewBranch",createNewBranch);

module.exports = route;