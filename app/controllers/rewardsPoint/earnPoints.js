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

const earnPoints = async (req, res) => { console.log(req.body)
  const session = await conn.startSession();
  try {
    
    const id = req.body.id;

    let earnPoints = req.body.earnPoints

    const result = await this.getUser(id);

    let status;

    console.log(result)

    if(String(result.id) == id){
       
      session.startTransaction();
     
      let totalPoints = result.earnPoints+parseInt(earnPoints);
      
      const user = await User.findByIdAndUpdate({_id:id},{earnPoints:totalPoints},{new:true}).session(session);
      
      console.log("user",user)
      
      const UserName =user._id;
      
      const Deposite =earnPoints;

      const Balance = user.earnPoints;

      const today = new Date();
      const day = today.getDate();
      const month = today.getMonth()+1;     // 10 (Month is 0-based, so 10 means 11th Month)
      const year = today.getFullYear();
      const __Date = (day+"/"+month+"/"+year);
      
      await Transaction.create([{UserName,Deposite,Balance,__Date}],{ session })
                        .then(async()=>{
                          const message = "Dear User, you have earned "+earnPoints+" points and they were added to user Profile Dashboard";

                          status = await twilioService(result.mobileNumber,message)
                        })

      await session.commitTransaction();
     
      if(status == "200"){
      res.status(200).send({ status: 200, message: "successfully earn points has added into your profile dashboard and sent message to your mobile number!!",user})
      console.log('success');
      }else if(status.statuscode == "500"){
        res.status(500).send({status: 500,message:Err.message || "Some error occurred while sending Message to mobile number."});
      }
    }
    else if (result.id != id) {
              res.status(400).send({status: 400,message:"user does not exist." });
          }
  } catch (error) {
    console.log(error)
    await session.abortTransaction();
    res.status(500).send({ status: 500, message:"Some error occurred while adding earn points with respect to the user dashboard."})
    handleError(res, error)
  }
  session.endSession();
}

module.exports = { earnPoints }
