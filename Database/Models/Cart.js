const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new mongoose.Schema({
    antique: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Antique",
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
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

const Cart = mongoose.model("Cart", CartSchema);

module.exports = Cart;
