const { handleError } = require('../../middleware/utils')

const conn = require('../../models/session')

const User = require('../../models/user')

const Transaction = require('../../models/transaction')

const {twilioService} = require('../ThirdPartyServices/twilioService')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


 exports.getUser = async (id) => {

    var cursor;

     await User.findOne({ id: id }).then((data) => {
       if(data!=null){
           cursor = data}
       else if(data == null){
         cursor = false
       }
     })
       .catch(err => {
         cursor = false;
       });
     return cursor;
};

const redeemPoints = async (req, res) => { console.log(req.body)
  const session = await conn.startSession();
  try {

    const id = req.body.id;

    const redeemPoints = req.body.redeemPoints

    const result = await this.getUser(id);

    let status;

    console.log(result)

    if(String(result.id) == id && result.earnPoints>=redeemPoints){

    session.startTransaction();

     let remaningPoints= result.earnPoints-parseInt(redeemPoints);

     const user = await User.findByIdAndUpdate({_id:id},{earnPoints:remaningPoints},{new:true}).session(session);

     console.log("user",user)
      
      const UserName =user._id;
      
      const Withdraw = redeemPoints;

      const Balance = user.earnPoints;

      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth()+1;     // 10 (Month is 0-based, so 10 means 11th Month)
      const year = today.getFullYear();
      const __Date = (day+"/"+month+"/"+year);
      
      await Transaction.create([{UserName,Withdraw,Balance,__Date}],{ session })
                       .then(async()=>{

                        const message = "Dear User, we have redeem "+redeemPoints+" points from your Profile Dashboard";

                        status = await twilioService(result.mobileNumber,message)

                       })

      await session.commitTransaction();   
      
      if(status == "200"){
      res.status(200).send({ status: 200, message: "successfully earn points has redeem from your profile dashboard!!",user})

      console.log('success');
      }else if(status.statuscode == "500"){
        res.status(500).send({status: 500,message:Err.message || "Some error occurred while sending Message to mobile number."});
      }
    }
    else if (result.id != id) {
              res.status(400).send({status: 400,message:"user does not exist." });
          }

    else if (result.earnPoints<redeemPoints) {
            res.status(400).send({status: 400,message:"your points are not sufficient to use." });
        }
  }catch (error) {
    console.log(error)
    await session.abortTransaction();
    res.status(500).send({ status: 500, message:"Some error occurred while redeeming earn points with respect to the user dashboard."})
    handleError(res, error)
  }
  session.endSession();
}

module.exports = { redeemPoints }
