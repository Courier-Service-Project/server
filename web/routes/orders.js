const webOrderRouter = require("express").Router();
const {
  getOrderDetailsById,
  CreateOrder,
  getPendingOrdersList,
  getCompleteOrderList,
  getOnpickOrderList,
  getPendingorderdetailsById,
  getCompleteOrderdetailsById,
  getOnpickOrderdetailsById,
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
  getOndiliveryOrderList,
  getOnDiliveryOrderDetailById,
  getMonthlyOrderCount,
  getOnBranchOrderList,
  getOnBranchOrderDetailbyid,
} = require("../controllers/orders.js");
// protect, allowRoles("superAdmin"),

const { protect, allowRoles } = require("../middleware/auth.js");

webOrderRouter.get("/orderDetails/:orderId", getOrderDetailsById);
webOrderRouter.post("/", CreateOrder);
webOrderRouter.get("/pendingorderDetails", getPendingOrdersList);
webOrderRouter.get("/completeorderDetails", getCompleteOrderList);
webOrderRouter.get("/OnpickorderDetails", getOnpickOrderList);
webOrderRouter.get("/pendingorderdetailsbyid/:id", getPendingorderdetailsById);
webOrderRouter.get(
  "/completeorderdetailsbyid/:id",
  getCompleteOrderdetailsById
);
webOrderRouter.get("/Onpickorderdetailsbyid/:id", getOnpickOrderdetailsById);
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
webOrderRouter.get("/OndiliveryorderDetails", getOndiliveryOrderList);
webOrderRouter.get(
  "/OndiliveryorderDetailbyid/:id",
  getOnDiliveryOrderDetailById
);
webOrderRouter.get("/OnBranchOrderDetails", getOnBranchOrderList);
webOrderRouter.get("/OnBranchOrderDetailsbyid/:id", getOnBranchOrderDetailbyid);
webOrderRouter.get("/MonthlyOrderCount", getMonthlyOrderCount);

module.exports = webOrderRouter;
