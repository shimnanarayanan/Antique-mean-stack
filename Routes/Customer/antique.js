const express = require("express");
const router = express.Router();
const auth = require("../../Middleware/auth");

const antiqueController = require("../../Controllers/Customer/antiqueController");

router.get("/product",auth,userValidate(["guest"]),antiqueController.list);
router.get("/product/:id",auth,userValidate(["guest"]),antiqueController.details);

router.post("/product/favorite", auth,userValidate(),antiqueController.favorites);
router.get("/product/favorite/list", auth,userValidate(),antiqueController.userFavorites);
router.get("/products/search/all", auth,userValidate(["guest"]),antiqueController.search);


module.exports = router;

function userValidate(user = []) {
  const allowedUser = ["customer", ...user];
 
  return async function (req, res, next) {
    if (!allowedUser.includes(req.auth.USER_TYPE)) {

      return res.status(401).send({
        message: "Authorization failed. Please authenticate.",
      });
      // return res.sendStatus(401);
    }
    next();
  };
}
