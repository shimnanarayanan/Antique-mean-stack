const express = require("express");
const router = express.Router();
const auth = require("../../Middleware/auth");

const orderController = require("../../Controllers/Customer/orderController");


router.post("/add/cart", auth,userValidate(),orderController.addTocartWithLogin);
router.post("/add/user/address", auth,userValidate(),orderController.addressAdd);
router.get("/cart/list", auth,userValidate(),orderController.list);

module.exports = router;

function userValidate(user = []) {
  const allowedUser = ["customer", ...user];
  return  async function (req, res, next) {
    if (!allowedUser.includes(req.auth.USER_TYPE)) {
     
      return res.status(401).send({
        message:"Authorization failed. Please authenticate.",
      });
      // return res.sendStatus(401);
    }
    next();
  };
}
