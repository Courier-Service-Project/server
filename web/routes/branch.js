const route = require("express").Router();

const {
  getBranchLocation,
  getBranchDetails,
  createNewBranch,
  getDistance,
} = require("../controllers/branch.js");

const { protect, allowRoles } = require("../middleware/auth.js");

// protect, allowRoles("superAdmin"),

route.get("/", getBranchLocation);
route.get("/branchDetails", getBranchDetails);
route.post(
  "/createNewBranch",
  protect,
  allowRoles("SUPERADMIN"),
  createNewBranch
);
route.post("/getDistance", getDistance);

module.exports = route;
