const mongoose = require("mongoose");
const AntiqueSchema = new mongoose.Schema({
  name: {
     type: String,
      index: true,
  
  },
  description: {
  
      type: String,
    },
   
  pageKey: {
    type: String,
  },
 price:{
     type:Number
 },
 quantity:{
   type:Number
 },
 image:{
     type:String
 },
  sortOrder: {
    type: Number,
    index: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active",
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
AntiqueSchema.index({
  name: 1,
  createdAt: 1,
});

const Antique = mongoose.model("Antique", AntiqueSchema);

module.exports = Antique;
