const mongoose = require("mongoose");

const FavoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  antique: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Antique",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
const Favorite = mongoose.model("Favorite", FavoriteSchema);

module.exports = Favorite;
