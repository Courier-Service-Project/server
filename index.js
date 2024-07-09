const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());

//const userRouter = require("./api/users/userRoutes");
const userRouter = require("./mobile/routes/users"); //  api/mobile/users/login
const orderRouter = require("./mobile/routes/orders.js");
const webOrderRouter = require("./web/routes/orders.js");
const webBranchuser = require("./web/routes/branchuser.js");
const webApplicant = require("./web/routes/applicant.js");

const webAdmin = require("./web/routes/admin.js");
const webBranch = require("./web/routes/branch.js");

app.use(express.json());
app.use("/api/mobile/users", userRouter);
app.use("/api/mobile/orders", orderRouter);
app.use("/branchuser", webBranchuser);

app.use("/orders", webOrderRouter);
app.use("/admin", webAdmin);
app.use("/branch", webBranch);
app.use("/applicant", webApplicant);

app.listen(9000, () => console.log("App is listning on 9000"));
