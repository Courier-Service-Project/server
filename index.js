const express = require("express");
const app = express();
require("dotenv").config();
const cors=require('cors')
app.use(cors());
var cookieParser = require('cookie-parser')

app.use(cookieParser())


//const userRouter = require("./api/users/userRoutes");
const userRouter = require("./mobile/routes/users");  //  api/mobile/users/login
const orderRouter = require("./mobile/routes/orders.js");
const webOrderRouter = require("./web/routes/orders.js");


const webAdmin = require("./web/routes/admin.js")
const webBranch = require("./web/routes/branch.js")



app.use(express.json());
app.use("/api/mobile/users", userRouter);



app.use("/orders", webOrderRouter);
app.use("/admin", webAdmin);
app.use("/branch", webBranch);






app.listen(9000, () => console.log("App is listning on 9000"));
