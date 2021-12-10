const mongoose = require('mongoose')
const validator = require('validator')
const {ObjectId} = mongoose.Schema.Types
const mongoosePaginate = require('mongoose-paginate-v2')

const userSchema = new mongoose.Schema(
  {
    User_Name   :{type:String},

    earnPoints  :{type:Number},

    mobileNumber:{type:String}
  },
  {
    versionKey: false,
    timestamps: true
  }
)

userSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('User',userSchema)
