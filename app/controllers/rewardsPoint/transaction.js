const { handleError } = require('../../middleware/utils')

const Transaction = require('../../models/transaction')

/**
 * Register function called by route
 * @param {Object} req - request object
 * @param {Object} res - response object
 */


const transaction = async (req, res) => { console.log(req.body)

  try {

    const id = req.body.id;

    await Transaction.find({UserName:id})
                     .populate("UserName","User_Name")
              .then((data)=>{
                res.status(200).send({ status: 200, message: "successfully transaction details fetched!!",data})
              })
              .catch(Err => {
                res.status(500).send({
                status: 500,    
                message:Err.message || "Some error occurred while fetching transaction details."
                });
            });
      
      

      console.log('success');

  }catch (error) {
    console.log(error)
    handleError(res, error)
  }
}

module.exports = { transaction }
