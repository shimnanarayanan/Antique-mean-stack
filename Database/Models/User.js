const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
  },
  name:{
      type: String,
},
otp:{
    type:String
},
type:{
    type:String
},
  phone: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true
  },
 
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});



const User = mongoose.model("User", UserSchema);

module.exports = User;
