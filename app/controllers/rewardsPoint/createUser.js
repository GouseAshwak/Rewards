const { handleError } = require('../../middleware/utils')

const User = require('../../models/user')

const appInfo = require('../../../settings.json')


/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const createUser = async (req, res) => { console.log(req.body)
  try {
    
    const User_Name = req.body.User_Name;

    const earnPoints = req.body.earnPoints;
    
    const mobileNumber = req.body.mobileNumber;
         
          await User.create({User_Name,earnPoints,mobileNumber})
                          .then(()=>{
                              res.status(200).send({ status: 200, message: "successfully user has created!!"})
                          }).catch(Err => {
                              res.status(500).send({
                              status: 500,
                              message:
                                  Err.message || "Some error occurred while creating user."
                              });
                          });
    
  } catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { createUser }
