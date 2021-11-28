const express = require("express");
const router = express.Router();

const antiqueRoute = require("./antique");


router.use("/", antiqueRoute);



module.exports.router = router;
