const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')
const { stringify } = require('uuid')

const transactionSchema = new mongoose.Schema(
  {
    UserName :{type:ObjectId, ref:"User"},

    Deposite :{type:String,default:undefined},

    Withdraw :{type:String,default:undefined},

    Balance:{type:String},

    __Date   :{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

transactionSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Transaction',transactionSchema)
