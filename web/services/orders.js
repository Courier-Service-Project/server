const pool = require("../../config/dbConfig.js");
module.exports={
    getOrderDetailsById: (id,callBack)=>{
        pool.query(`SELECT Emmergency,Total_Cost,Weight_Cost,branchLocation,Pickup_StreetNo,Pickup_Street,Pickup_City,Status,FirstName,LastName,mobile,StreetNo,Street,City
        FROM Orders,Reciever,RecieverMobile
        WHERE Reciever.recieverId=Orders.recieverId AND Reciever.recieverId=RecieverMobile.recieverId AND Orders.Order_id = ?`,
        [id],
        (error,results,feilds)=>{
            if(error){
                return callBack(error);
            }
            return callBack(null,results);
        })
    }
}