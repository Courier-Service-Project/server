const route = require("express").Router();

const {getBranchLocation} = require("../controllers/branch.js");

route.get("/",getBranchLocation);

module.exports = route;