const webOrderRouter = require ("express").Router();
const {getOrderDetailsById,CreateOrder}=require("../controllers/orders.js")
const { protect,allowRoles } = require('../middleware/auth.js')

webOrderRouter.get("/orderDetails/:orderId",getOrderDetailsById);
webOrderRouter.post("/",CreateOrder);

module.exports = webOrderRouter; 