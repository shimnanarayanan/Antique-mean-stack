const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AddressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },

  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  country: {
    type:String,
    desfault: "India",
  },
  defaultAddress: {
    type: String,
    enum: ["Yes", "No"],
    default: "No",
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Address = mongoose.model("Address", AddressSchema);

module.exports = Address;
