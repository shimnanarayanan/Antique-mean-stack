const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartTotalSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  subTotal: {
    type: Number,
  },
  grandTotal: {
    type: Number,
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

const CartTotal = mongoose.model("CartTotal", CartTotalSchema);

module.exports = CartTotal;
