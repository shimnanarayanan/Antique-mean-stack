const Cart = require("../../Database/Models/Cart");
const Antique = require("../../Database/Models/Antique");

const handleErrorsCustomer = require("../../utils/helper").handleErrorsCustomer;
const ObjectId = require("mongoose").Types.ObjectId;
const _ = require("lodash");
const Favorite = require("../../Database/models/Favorite");

const handleError = require("../../utils/helper").handleErrors;
const CartTotal = require("../../Database/Models/CartTotal");
const Address = require("../../Database/Models/Address");
const Order = require("../../Database/Models/Order");

const OrdeGroup = require("../../Database/Models/OrderGroup");

module.exports = {


  addTocartWithLogin: async (req, res) => {
    try {
      let inputParams = req.body;
      let quantity = inputParams.quantity;
      let antique = inputParams.antique;
      let user = req.auth.USER_ID;

      let cart;
      let cartTotal;



      antique = await Antique.findById(antique);


      if (antique.quantity < quantity) {

        return res.status(400).send({
          message: "Antique is not available"
        });
      }

      price = antique.price

      inputParams.price = price;


      let check = await Cart.findOne({ user: user });
      if (check) {
        cart = await Cart.findOne({
          user: user,
          antique: antique,
        });
        if (cart) {
          if (quantity != 0) {

            cart.quantity = quantity;

            cart.price = cart.quantity * inputParams.price;


            await cart.save();
          } else {
            await Cart.findOneAndRemove({
              user: user,
              antique: antique,
            });
          }
        } else {
          //discountprice
          cart = await Cart.create(inputParams);
          cart.user = user;


          await cart.save();
        }


        let tempResponse = await updateCartTotal(
          { user: user },
          inputParams,
          false,
        );
        cartTotal = tempResponse.cartTotal;
      } else {


        let tempResponse = await updateCartTotal(
          { user: user },
          inputParams,
          true
        );
        cartTotal = tempResponse.cartTotal;
        cart = tempResponse.cart;
      }

      let cartItems = await Cart.find({ user: user })

        .populate({
          path: "antique",
          model: Antique,

        })
        .sort({ createdAt: -1 })
        .lean()


      if (quantity == 0) {
        return res.status(200).send({
          message: "Product removed from cart",
          data: { cartItems, cartTotal },
        });
      }

      return res.status(200).send({
        message: "Cart updated successfully",
        data: { cartItems, cartTotal },
      });

    } catch (error) {
      let message = await handleError(error);
      console.log(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

  list: async (req, res) => {
    try {
      let inputParams = req.query;
      let user = req.auth.USER_ID;
      let cartItems;
      let cartTotal;
      let message;



      cartItems = await Cart.find({
        user: user,
      })

        .populate({
          path: "antique",
          model: Antique,

        })
        .sort({ createdAt: -1 })
        .lean()
        .exec()

      cartTotal = await CartTotal.findOne({ user: user });




      return res.status(200).send({
        message: "Success",
        data: { cartItems, cartTotal },
      });
    } catch (error) {
      let message = await handleError(error);
      console.log(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

  addressAdd: async (req, res, next) => {
    // Create a new Address
    try {
      let inputParams = req.body
      let message;
      inputParams.user = req.auth.USER_ID;



      await Address.create(inputParams);
      const address = await Address.find({ user: req.auth.USER_ID })



      return res.status(200).send({
        message: "Address added successfully",
        data: address,
      });
    } catch (error) {
      let message = await handleError(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

  orderConfirm: async (req, res, next) => {
    try {
      let user = req.auth.USER_ID;
      let inputParams = req.body;
      let message;
      let deliveryType;
      let deliveryDate;
      let platform;

      if (inputParams.deliveryType != null) {
        deliveryType = inputParams.deliveryType;
      } else {
        deliveryType = "Normal"
      }
      if (inputParams.deliveryDate != null) {
        deliveryDate = inputParams.deliveryDate;
      } else {
        deliveryDate = moment().add(30, "d").format("YYYY-MM-DD")
      }


      let uid = await addressExistParams(user, inputParams.address);
      if (uid) {
        return res.status(400).send({
          message: "Invalid Address/user",
        });
      }

      let cart = await Cart.find({ user: user })
        .populate("product", { _id: 1, mainImage: 1, name: 1, vendor: 1, discountReached: 1, discountEndDate: 1, pageKey: 1, itemCode: 1 })


      let address = await Address.findById(inputParams.address)

      let billingAddress = {
        name: address.name,
        address1: address.address1,
        address2: address.address2,

        phone: address.phone,
      };


      let userEmail = await User.findOne({ _id: user }, { email: 1 })


      let order;

      let orderGroupExist = await OrderGroup.findOne({
        user: user,
        status: "Active",
      });
      if (orderGroupExist) {
        orderGroupExist.status = "Inactive";
        await orderGroupExist.save();
      }
      let status = await WorkerStatus.findOne({ key: "pending" })
      let orderGroup = new OrderGroup({ user: user });
      for (ct of cart) {
        order = new Order({
          user: user,
          email: userEmail.email,
          billingAddress: billingAddress,
          shippingAddress: billingAddress,
          orderDate: moment().format("YYYY-MM-DD"),
          antique: ct.antique,
          productName: ct.antique.name,
          productImage: ct.product.mainImage,
          deliveryDate: deliveryDate,
          deliveryType: deliveryType,
          price: ct.price,
          quantity: ct.quantity,
        });



        let productAvailibility = await Product.findById(ct.product._id);
        if (productAvailibility.quantity < ct.quantity) {

          return res.status(400).send({
            message: "Sorry! ${productName} is out of Stock!"
          });
        }

      }



      await order.save();
      orderGroup.orders.push(order._id);
      await orderGroup.save();


      cartTotal = await CartTotal.findOne({
        user: user,
      })


      let orderGroups = await OrderGroup.findOne({
        user: user,
        status: "Active",
      }).populate("orders")

      let totalOrder = orderGroups.orders.length;

      for (orders of orderGroups.orders) {
        orders.orderNumber = orders.orderNo + orders.orderPrefix;
        await orders.save();


      }



      orderGroups.subTotal = cartTotal.subTotal;
      orderGroups.grandTotal = cartTotal.grandTotal;

      orderGroups.shippingCharge = cartTotal.shippingCharge;
      orderGroups.deliveryDate = deliveryDate;
      orderGroups.deliveryType = deliveryType;
      orderGroups.billingAddress = billingAddress,
        orderGroups.shippingAddress = billingAddress,
        orderGroups.invoicePrefix = invoicePrefix,
        orderGroups.platform = platform,
        orderGroups.orderDate = moment().format("YYYY-MM-DD"),

        orderGroups.orderGroupNumber = orderGroups.orderNumber + orderGroups.orderGroupPrefix;

      await orderGroups.save();
      orderGroups = await OrderGroup.findOne({ user: user, status: "Active" })
        .populate("orders")

        .populate("user")
        .lean()
        .exec()




      return res.status(200).send({
        message: "Success",
        data: orderGroups
      });





    } catch (error) {
      let message = await handleErrorsCustomer(error);
      console.log(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },


};



async function updateCartTotal(uid, inputParams, enableCreateCart) {
  let cartTotal;
  let priceArray = [];
  let apiId = uid.apiId;
  let cart;
  let shippingCharge;
  let carts;
  if (uid.user) {
    carts = await Cart.find(uid);
  }

  if ((!carts || carts.length == 0) && enableCreateCart) {

    cart = await Cart.create(inputParams);

    if (uid.user) {
      cart.user = uid.user;
    }
    cart.price = inputParams.quantity * inputParams.price;


    carts = [];
    carts.push(await cart.save());
  }

  await carts.map((b) => priceArray.push(b.price));
  let val = priceArray.reduce(function (a, b) {
    return a + b;
  }, 0);

  let sum = val;


  cartTotal = await CartTotal.findOne(uid);


  if (!cartTotal && sum != 0) {
    if (uid.user) {


      let address = await Address.findOne(
        { user: uid.user, defaultAddress: "Yes" },

      );

      if (address) {

        shippingCharge = 0;


      }

      cartTotal = new CartTotal({
        user: uid.user,
        subTotal: sum,
        grandTotal: sum,
        shippingCharge: shippingCharge,
      });


      if (address) {
        cartTotal.grandTotal = sum + shippingCharge;
      } else {
        cartTotal.grandTotal = sum;
      }


    }
    await cartTotal.save();
  } else if (cartTotal && +sum > 0) {
    cartTotal.subTotal = sum;
    cartTotal.grandTotal = sum;
    await cartTotal.save()



    await cartTotal.save();
  } else {
    await cartTotal.remove();
  }
  return {
    cartTotal: cartTotal,
    cart: cart,
  };
}
