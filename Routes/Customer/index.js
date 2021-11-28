const express = require("express");
const router = express.Router();

const orderRoute = require("./order");
const antiqueRoute = require("./antique");



router.use("/", orderRoute);
router.use("/", antiqueRoute);


module.exports.router = router;
