const express = require("express");
const router = express.Router();
const auth = require("../../Middleware/auth");

const antiqueController = require("../../Controllers/Admin/antiqueController");


router.post(
    "/antique",
  
    antiqueController.create
  );
module.exports = router;




