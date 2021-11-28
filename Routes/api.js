const express = require("express");
const router = express.Router();

const adminRoutes = require("./Admin").router;
const customerRoutes = require("./Customer").router;


module.exports.router = {
  adminRoutes: adminRoutes,
  customerRoutes: customerRoutes,


};
