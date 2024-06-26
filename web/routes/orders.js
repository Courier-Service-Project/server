const webOrderRouter = require("express").Router();
const {
  getOrderDetailsById,
  CreateOrder,
  getPendingOrdersList,
  getCompleteOrderList,
  getOnpickOrderList,
  getPendingorderdetailsById,
  getCompleteOrderdetailsById,
  getinprogressOrderdetailsById,
  DeletePendingOrderDetailsById,
  UpdatePendingOrderDetailsById,
  EditPendindOrder,
  getVerifyPickedOrderList,
  getVerifyPickedOrderListById,
  UpdateVerifyPickedOrderDetailsById,
  getVerifydiliveryOrderList,
  getVerifyDiliveryOrderListById,
  UpdateVerifyDiliveryOrderDetailsById,
  getOrderCounts,
} = require("../controllers/orders.js");
const { protect, allowRoles } = require("../middleware/auth.js");

webOrderRouter.get("/orderDetails/:orderId", getOrderDetailsById);
webOrderRouter.post("/", CreateOrder);
webOrderRouter.get("/pendingorderDetails", getPendingOrdersList);
webOrderRouter.get("/completeorderDetails", getCompleteOrderList);
webOrderRouter.get("/InprogressorderDetails", getOnpickOrderList);
webOrderRouter.get("/pendingorderdetailsbyid/:id", getPendingorderdetailsById);
webOrderRouter.get(
  "/completeorderdetailsbyid/:id",
  getCompleteOrderdetailsById
);
webOrderRouter.get(
  "/inprogressorderdetailsbyid/:id",
  getinprogressOrderdetailsById
);
webOrderRouter.delete(
  "/deletependingorderdetails/:id",
  DeletePendingOrderDetailsById
);
webOrderRouter.patch(
  "/updatependingorderdetails/:id",
  UpdatePendingOrderDetailsById
);
webOrderRouter.post("/editpendingorderdetails", EditPendindOrder);
webOrderRouter.get("/verifypickedorderDetails", getVerifyPickedOrderList);
webOrderRouter.get(
  "/verifypickedorderDetails/:id",
  getVerifyPickedOrderListById
);
webOrderRouter.patch(
  "/updateverifyPickedorderDetails/:id",
  UpdateVerifyPickedOrderDetailsById
);
webOrderRouter.get("/verifydiliveryorderDetails", getVerifydiliveryOrderList);
webOrderRouter.get(
  "/verifydiliveryorderDetailsbyid/:id",
  getVerifyDiliveryOrderListById
);
webOrderRouter.patch(
  "/updateverifyDiliveryorderDetails/:id",
  UpdateVerifyDiliveryOrderDetailsById
);
webOrderRouter.get("/orderCounts", getOrderCounts);

module.exports = webOrderRouter;
