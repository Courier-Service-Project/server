const pool = require("../../config/dbConfig.js");
module.exports = {
  getOrderDetailsById: (id, callBack) => {
    pool.query(
      `SELECT Emmergency,Total_Cost,Weight_Cost,branchLocation,Pickup_StreetNo,Pickup_Street,Pickup_City,Status,FirstName,LastName,mobile,StreetNo,Street,City
        FROM Orders,Reciever,RecieverMobile
        WHERE Reciever.recieverId=Orders.recieverId AND Reciever.recieverId=RecieverMobile.recieverId AND Orders.Order_id = ?`,
      [id],
      (error, results, feilds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  SenderTable: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Customer (FirstName,LastName,StreetNo,Street,City,Email) values(?,?,?,?,?,?)`,
        [
          data.sfname,
          data.slname,
          data.sstreetNo,
          data.sstreet,
          data.scity,
          data.sEmail,
        ],
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  RecieverTable: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Reciever (FirstName,LastName,DiliveryProvince,DiliveryDistrict,StreetNo,Street,City,Email) values(?,?,?,?,?,?,?,?)`,
        [
          data.rfname,
          data.rlname,
          data.rprovince,
          data.rdistric,
          data.rstreetNo,
          data.rstreet,
          data.rhometown,
          data.rEmail,
        ],

        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  OrderTable: (data, rid, sid) => {
    if (data.pimergency === "Immergency") {
      data.pimergency = "T";
    } else {
      data.pimergency = "F";
    }
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into Orders (Pickup_District,Pickup_StreetNo,Pickup_Street,Pickup_City,Status,Emmergency,branchLocation,Distance_Cost,admin_Id,recieverId,cus_id) values(?,?,?,?,?,?,?,?,?,?,?)`,
        [
          data.pdistrict,
          data.pstreetNo,
          data.pstreet,
          data.phometown,
          "VERIFYCONFIRM",
          data.pimergency,
          data.pbranch,
          data.pdistancecost,
          data.padminID,
          rid,
          sid,
        ],
        (error, results, feilds) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  GetsenderID: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT max(cus_id) as sID FROM Customer `,
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results[0].sID);
        }
      );
    });
  },
  GetRecieverID: () => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT max(recieverId) as rID FROM Reciever `,
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results[0].rID);
        }
      );
    });
  },
  SenderTele: (rid, tele) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into CustomerMobile (cus_id,mobile) values(?,?)`,
        [rid, tele],
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  RecieverTele: (sid, tele) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `insert into RecieverMobile (recieverId,mobile) values(?,?)`,
        [sid, tele],
        (error, results, feilds) => {
          if (error) {
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },

  getPendingOrdersList: (callBack) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Pickup_City,FirstName
        FROM Orders,Customer
        WHERE Customer.cus_id=Orders.cus_id AND Orders.Status = "VERIFYCONFIRM"`,
      (error, results, feilds) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getCompleteOrderList: (callBack) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Pickup_City,FirstName
        FROM Orders,Customer
        WHERE Customer.cus_id=Orders.cus_id AND Orders.Status = "DILIVERED"`,
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getInprogressOrderList: (callBack) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Pickup_City,FirstName
        FROM Orders,Customer
        WHERE Customer.cus_id=Orders.cus_id AND Orders.Status = "ONPICK"`,
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getPendingorderdetailsById: (id, callBack) => {
    // console.log(id);
    pool.query(
      `SELECT o.Order_id,c.cus_id,r.recieverId,c.FirstName AS CustomerFirstName,c.LastName AS CustomerLastName,c.city AS Customercity,cm.mobile AS Customermobile,r.FirstName,r.LastName,r.DiliveryProvince,r.DiliveryDistrict,r.StreetNo,r.Street,r.City,rm.mobile,o.Pickup_District,o.Pickup_StreetNo,o.Pickup_Street,o.Pickup_City,o.Emmergency
            FROM Customer c,CustomerMobile cm,Reciever r,RecieverMobile rm,Orders o 
            WHERE o.Order_id=? AND o.Status=? AND o.cus_id=c.cus_id AND o.recieverId=r.recieverId AND c.cus_id=cm.cus_id  AND r.recieverId=rm.recieverId`,
      [id, "VERIFYCONFIRM"],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        // console.log(results);
        return callBack(null, results);
      }
    );
  },

  getCompleteOrderdetailsById: (id, callBack) => {
    pool.query(
      `SELECT o.Order_id,c.FirstName AS CustomerFirstName,c.LastName AS CustomerLastName,c.city AS Customercity,cm.mobile AS Customermobile,r.FirstName,r.LastName,r.DiliveryProvince,r.DiliveryDistrict,r.StreetNo,r.Street,r.City,rm.mobile,o.Pickup_District,o.Pickup_StreetNo,o.Pickup_Street,o.Pickup_City,o.Emmergency
            FROM Customer c,CustomerMobile cm,Reciever r,RecieverMobile rm,Orders o 
            WHERE o.Order_id=? AND o.Status=? AND o.cus_id=c.cus_id AND o.recieverId=r.recieverId AND c.cus_id=cm.cus_id  AND r.recieverId=rm.recieverId`,
      [id, "DILIVERED"],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getinprogressOrderdetailsById: (id, callBack) => {
    pool.query(
      `SELECT o.Order_id,c.FirstName AS CustomerFirstName,c.LastName AS CustomerLastName,c.city AS Customercity,cm.mobile AS Customermobile,r.FirstName,r.LastName,r.DiliveryProvince,r.DiliveryDistrict,r.StreetNo,r.Street,r.City,rm.mobile,o.Pickup_District,o.Pickup_StreetNo,o.Pickup_Street,o.Pickup_City,o.Emmergency
             FROM Customer c,CustomerMobile cm,Reciever r,RecieverMobile rm,Orders o 
             WHERE o.Order_id=? AND o.Status=? AND o.cus_id=c.cus_id AND o.recieverId=r.recieverId AND c.cus_id=cm.cus_id  AND r.recieverId=rm.recieverId`,
      [id, "ONPICK"],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  getRegisterdpersonDetailsList: (callBack) => {
    pool.query(
      `SELECT BranchUser_id,FirstName,City,Email,branchLocation
                    FROM BranchUser`,
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  DeletePendingOrderDetailsById: (id, callBack) => {
    pool.query(
      `DELETE FROM Orders WHERE Order_id = ? AND Status = 'VERIFYCONFIRM'`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },

  UpdatePendingOrderDetailsById: (id, callBack) => {
    // console.log(id);
    pool.query(
      `UPDATE Orders SET Status = 'PENDING' WHERE Order_id = ? AND Status='VERIFYCONFIRM'`,
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        // console.log(results);
        return callBack(null, results);
      }
    );
  },
  getVerifyPickedOrderList: (callBack) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Pickup_City,FirstName
            FROM Orders,Customer
            WHERE Customer.cus_id=Orders.cus_id AND Orders.Status = "VERIFYPICKED"`,
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getVerifyPickedOrderListById: (id, callBack) => {
    pool.query(
      `SELECT o.Order_id,c.FirstName AS CustomerFirstName,c.LastName AS CustomerLastName,c.city AS Customercity,cm.mobile AS Customermobile,r.FirstName,r.LastName,r.DiliveryProvince,r.DiliveryDistrict,r.StreetNo,r.Street,r.City,rm.mobile,o.Pickup_District,o.Pickup_StreetNo,o.Pickup_Street,o.Pickup_City,o.Emmergency
             FROM Customer c,CustomerMobile cm,Reciever r,RecieverMobile rm,Orders o 
             WHERE o.Order_id=? AND o.Status=? AND o.cus_id=c.cus_id AND o.recieverId=r.recieverId AND c.cus_id=cm.cus_id  AND r.recieverId=rm.recieverId`,
      [id, "VERIFYPICKED"],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  UpdateVerifyPickedOrderDetailsById: (id, callBack) => {
    // console.log(id);
    pool.query(
      `UPDATE Orders SET Status = 'ONDILIVERY' WHERE Order_id = ? AND Status='VERIFYPICKED'`,
      [id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        // console.log(results)
        return callBack(null, results);
      }
    );
  },
  getVerifydiliveryOrderList: (callBack) => {
    pool.query(
      `SELECT Order_id,Pickup_District,Pickup_City,FirstName
            FROM Orders,Customer
            WHERE Customer.cus_id=Orders.cus_id AND Orders.Status = "VERIFYDILIVERY"`,
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  getVerifyDiliveryOrderListById: (id, callBack) => {
    pool.query(
      `SELECT o.Order_id,c.FirstName AS CustomerFirstName,c.LastName AS CustomerLastName,c.city AS Customercity,cm.mobile AS Customermobile,r.FirstName,r.LastName,r.DiliveryProvince,r.DiliveryDistrict,r.StreetNo,r.Street,r.City,rm.mobile,o.Pickup_District,o.Pickup_StreetNo,o.Pickup_Street,o.Pickup_City,o.Emmergency,o.Total_Cost
             FROM Customer c,CustomerMobile cm,Reciever r,RecieverMobile rm,Orders o 
             WHERE o.Order_id=? AND o.Status=? AND o.cus_id=c.cus_id AND o.recieverId=r.recieverId AND c.cus_id=cm.cus_id  AND r.recieverId=rm.recieverId`,
      [id, "VERIFYDILIVERY"],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  UpdateVerifyDiliveryOrderDetailsById: (id, date, time, callBack) => {
    // console.log(id);
    pool.query(
      `UPDATE Orders SET Status = 'DILIVERED',dilivery_Date=?,dilivery_Time=? WHERE Order_id = ? AND Status='VERIFYDILIVERY'`,
      [date, time, id],
      (error, results) => {
        if (error) {
          return callBack(error);
        }
        // console.log(results)
        return callBack(null, results);
      }
    );
  },
  getOrderTotalCost: (id, callback) => {
    pool.query(
      `SELECT Total_Cost,BranchUser_id FROM Orders WHERE Order_id=?`,
      [id],
      (error, results) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      }
    );
  },
  UpdateUserEarnings: (id, price, callback) => {
    pool.query(
      `UPDATE BranchUser
      SET totalEarnings  =totalEarnings + ?
      WHERE BranchUser_id=?`,
      [price, id],
      (error, result) => {
        if (error) {
          callback(error);
        }
        // console.log(result);
        return callback(null, result);
      }
    );
  },
  EditPendingOrderDetailById: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update Orders SET Pickup_District=?,Pickup_StreetNo=?,Pickup_Street=?,Pickup_City=?,Emmergency=? where (Order_id=?)`,
        [
          data.pdistrict,
          data.pstreetNo,
          data.pstreet,
          data.phometown,
          data.potype,
          data.OrID,
        ],
        (error, results, feilds) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },

  EditcustomerPendingOrderDetailById: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update Customer SET FirstName=?,LastName=?,City=? where (cus_id=?)`,
        [data.sfname, data.slname, data.scity, data.customerid],
        (error, results, feilds) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },

  EditreciverPendingOrderDetailById: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update Reciever SET DiliveryProvince=?,DiliveryDistrict=?,StreetNo=?,Street=?,City=? where (recieverId=?)`,
        [
          data.rprovince,
          data.rdistric,
          data.rstreetNo,
          data.rstreet,
          data.rhometown,
          data.reciverid,
        ],
        (error, results, feilds) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },

  EditcustomermobilePendingOrderDetailById: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update CustomerMobile SET mobile=? where (cus_id=?)`,
        [data.stelephone, data.customerid],
        (error, results, feilds) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },

  EditrecivermobilePendingOrderDetailById: (data) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `update RecieverMobile SET mobile=? where (recieverId=?)`,
        [data.rtelephone, data.reciverid],
        (error, results, feilds) => {
          if (error) {
            console.log(error);
            reject(error);
          }
          resolve(results);
        }
      );
    });
  },
  getOrderCounts: (callBack) => {
    const query = `
        SELECT 
            COUNT(CASE WHEN Status = 'PENDING' THEN 1 END) AS pendingCount,
            COUNT(CASE WHEN Status = 'ONPICK' THEN 1 END) AS onpickCount,
            COUNT(CASE WHEN Status = 'ONDILIVERY' THEN 1 END) AS ondiliveryCount,
            COUNT(CASE WHEN Status = 'DILIVERED' THEN 1 END) AS completeCount
        FROM Orders;
    `;

    pool.query(query, (error, results, fields) => {
      if (error) {
        return callBack(error);
      }
      const counts = results[0];
      return callBack(null, counts);
    });
  },
};
