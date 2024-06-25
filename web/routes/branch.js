const route = require("express").Router();

const {
  getBranchLocation,
  getBranchDetails,
  createNewBranch,
  getDistance,
} = require("../controllers/branch.js");

route.get("/", getBranchLocation);
route.get("/branchDetails", getBranchDetails);
route.post("/createNewBranch", createNewBranch);
route.post("/getDistance", getDistance);

module.exports = route;
