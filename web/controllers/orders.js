const {
  getOrderDetailsById,
  OrderTable,
  RecieverTable,
  SenderTable,
  GetsenderID,
  GetRecieverID,
  SenderTele,
  RecieverTele,
  getEPendingOrdersList,
  getNEPendingOrdersList,
  getCompleteOrderList,
  getOnpickOrderList,
  getPendingorderdetailsById,
  getCompleteOrderdetailsById,
  getOnpickOrderdetailsById,
  DeletePendingOrderDetailsById,
  UpdatePendingOrderDetailsById,
  getVerifyPickedOrderList,
  getVerifyPickedOrderListById,
  UpdateVerifyPickedOrderDetailsById,
  getVerifydiliveryOrderList,
  getVerifyDiliveryOrderListById,
  UpdateVerifyDiliveryOrderDetailsById,
  EditPendingOrderDetailById,
  EditcustomerPendingOrderDetailById,
  EditreciverPendingOrderDetailById,
  EditcustomermobilePendingOrderDetailById,
  EditrecivermobilePendingOrderDetailById,
  getOrderTotalCost,
  UpdateUserEarnings,
  getOrderCounts,
  getOndiliveryOrderList,
  getOnDiliveryOrderDetailById,
  getMonthlyOrderCount,
  getOnBranchOrderList,
  getOnBranchOrderDetailbyid,
} = require("../services/orders");

module.exports = {
  getOrderDetailsById: (req, res) => {
    const id = req.params.orderId;
    getOrderDetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  CreateOrder: async (req, res) => {
    const data = req.body;
    try {
      await SenderTable(data);
      await RecieverTable(data);
      const senderID = await GetsenderID();
      const recieverID = await GetRecieverID();
      await SenderTele(senderID, data.stelephone);
      await RecieverTele(recieverID, data.rtelephone);
      await OrderTable(data, recieverID, senderID);

      return res.json({
        success: 1,
        message: "order placed successfully",
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: error,
      });
    }
  },

  getEPendingOrdersList: (req, res) => {
    getEPendingOrdersList((error, results) => {
      // console.log(results);
      if (error) {
        // console.log("this is error");
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        // console.log("no pending orders yet");
        res.json({
          success: 101,
          message: "no pending orders yet",
        });
      } else if (results) {
        // console.log(results);
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getNEPendingOrdersList: (req, res) => {
    getNEPendingOrdersList((error, results) => {
      // console.log(results);
      if (error) {
        // console.log("this is error");
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        // console.log("no pending orders yet");
        res.json({
          success: 101,
          message: "no Non Energency pending orders yet",
        });
      } else if (results) {
        // console.log(results);
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  getCompleteOrderList: (req, res) => {
    getCompleteOrderList((error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length === 0) {
        res.json({
          success: 101,
          message: "no complete orders yet",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getOnpickOrderList: (req, res) => {
    getOnpickOrderList((error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "no onpick orders yet",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  getPendingorderdetailsById: (req, res) => {
    // console.log(req);
    const id = req.params.id;
    // console.log("id", id);
    getPendingorderdetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      if (results === undefined){
        return res.json({
          success:3,
          message:results,
        })
      }
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  getCompleteOrderdetailsById: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    getCompleteOrderdetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } 
      if (results == undefined) {
        res.json({
          success: 3,
          message: results,
        });
      }
      else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  getOnpickOrderdetailsById: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    getOnpickOrderdetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },

  DeletePendingOrderDetailsById: (req, res) => {
    const id = req.params.id;
    DeletePendingOrderDetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      } else if (results.affectedRows === 0) {
        res.json({
          success: 101,
          message: "Invalid order id or order is not pending",
        });
      } else {
        res.json({
          success: 200,
          message: "Order deleted successfully",
        });
      }
    });
  },

  UpdatePendingOrderDetailsById: (req, res) => {
    const id = req.params.id;
    UpdatePendingOrderDetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      } else if (results.affectedRows > 0) {
        res.json({
          success: 200,
          message: "Order Confirm successfully",
        });
      } else {
        res.json({
          success: 101,
          message: "Try Again",
        });
      }
    });
  },

  EditPendindOrder: async (req, res) => {
    const data = req.body;

    try {
      await EditPendingOrderDetailById(data);
      await EditcustomerPendingOrderDetailById(data);
      await EditreciverPendingOrderDetailById(data);
      await EditcustomermobilePendingOrderDetailById(data);
      await EditrecivermobilePendingOrderDetailById(data);

      return res.json({
        success: 1,
        message: "update Successfull",
      });
    } catch (error) {
      return res.json({
        success: 0,
        message: error,
      });
    }
  },
  getVerifyPickedOrderList: (req, res) => {
    getVerifyPickedOrderList((error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "no Verify Picked orders yet",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getVerifyPickedOrderListById: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    getVerifyPickedOrderListById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  UpdateVerifyPickedOrderDetailsById: (req, res) => {
    const id = req.params.id;
    UpdateVerifyPickedOrderDetailsById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      } else if (results.affectedRows > 0) {
        res.json({
          success: 200,
          message: "Order Confirm successfully",
        });
      } else {
        res.json({
          success: 101,
          message: "Order Confirm unsuccessfully",
        });
      }
    });
  },
  getVerifydiliveryOrderList: (req, res) => {
    getVerifydiliveryOrderList((error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "no Verify dilivery orders yet",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getVerifyDiliveryOrderListById: (req, res) => {
    const id = req.params.id;
    // console.log(id);
    getVerifyDiliveryOrderListById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  UpdateVerifyDiliveryOrderDetailsById: (req, res) => {
    const id = req.params.id;
    const date = `${new Date().getFullYear().toString()}-${(
      new Date().getMonth() + 1
    ).toString()}-${new Date().getDate().toString()}`;
    const time = `${new Date().getHours()}:${new Date().getMinutes()}`;
    UpdateVerifyDiliveryOrderDetailsById(id, date, time, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      } else if (results.affectedRows > 0) {
        getOrderTotalCost(id, (error, results) => {
          if (error) {
            res.json({
              success: 0,
              message: error,
            });
          }
          if (results.length > 0) {
            // console.log(results[0].Total_Cost);
            // console.log(results[0].BranchUser_id);
            UpdateUserEarnings(
              results[0].BranchUser_id,
              results[0].Total_Cost,
              (error, result) => {
                if (error) {
                  // console.log(error);
                  res.json({
                    success: 0,
                    message: error,
                  });
                } else if (result) {
                  // console.log(result);
                  res.json({
                    success: 200,
                    message: "successfully inserted",
                  });
                } else {
                  // console.log('no');
                  res.json({
                    success: 101,
                    message: "Earning update failed",
                  });
                }
              }
            );
          } else {
            res.json({
              success: 101,
              message: "Price doesn't found",
            });
          }
        });
      } else {
        res.json({
          success: 101,
          message: "Order Confirm unsuccessfully",
        });
      }
    });
  },
  getOrderCounts: (req, res) => {
    getOrderCounts((error, result) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      return res.json({
        success: 200,
        message: result,
      });
    });
  },
  getOndiliveryOrderList: (req, res) => {
    getOndiliveryOrderList((error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "no ondilivery orders yet",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getOnDiliveryOrderDetailById: (req, res) => {
    // console.log(req);
    const id = req.params.id;
    // console.log("id", id);
    getOnDiliveryOrderDetailById(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getOnBranchOrderList: (req, res) => {
    getOnBranchOrderList((error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "no onbranch orders yet",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getOnBranchOrderDetailbyid: (req, res) => {
    // console.log(req);
    const id = req.params.id;
    // console.log("id", id);
    getOnBranchOrderDetailbyid(id, (error, results) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      if (results.length == 0) {
        res.json({
          success: 101,
          message: "invalid order id",
        });
      } else if (results) {
        res.json({
          success: 200,
          message: results,
        });
      }
    });
  },
  getMonthlyOrderCount: (req, res) => {
    getMonthlyOrderCount((error, result) => {
      if (error) {
        res.json({
          success: 0,
          message: error,
        });
      }
      return res.json({
        success: 200,
        message: result,
      });
    });
  },
};
