const Antique = require("../../Database/Models/Antique");

const handleErrorsCustomer = require("../../utils/helper").handleErrorsCustomer;
const ObjectId = require("mongoose").Types.ObjectId;
const _ = require("lodash");
const Favorite = require("../../Database/models/Favorite");

const handleError = require("../../utils/helper").handleErrors;



module.exports = {
  list: async (req, res, next) => {
    // Get all antique
    try {
    

      const antique = await Antique.find()



      return res.status(200).send({
        message: "Success",
        data: antique,

      });
    } catch (error) {
      let message = await handleError(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

  details: async (req, res, next) => {
// Get all antique
    try {

      const antique = await Antique.findById(req.params.id)



      return res.status(200).send({
        message: "Success",
        data: antique,

      });
    } catch (error) {
      let message = await handleError(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },


  favorites: async (req, res) => {
    try {
      let inputParams = req.body;
      let data = null;
      let user;

      user = req.auth.USER_ID


      const antique = await Favorite.findOne({
        user: user,
        antique: inputParams.antique,
      });
      if (antique) {
        data = antique.remove();
      } else {
        data = await Favorite.create(inputParams);
        if (!data.user) {
          data.user = req.auth.USER_ID;
          await data.save()
        }
      }


      return res.status(200).send({
        message: antique ? "Removed from your Wishlist" : "Added to your Wishlist",
        data: data
      });

    } catch (error) {
      let message = await handleError(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

  userFavorites: async (req, res) => {
    try {
      let userId = req.auth.USER_ID;
      const favorites = await Favorite.find({
        user: userId,
      })
        .populate("antique")





      return res.status(200).send({
        message: "Success",
        data: favorites,

      });
    } catch (error) {
      let message = await handleError(error);

      console.error(error);
      return res.status(400).send({
        error: error,

        message,
      });
    }
  },

  search: async (req, res) => {
    try {
      const key = req.query.key.toString().trim();
      const antique= await Antique.find({name: { $regex: key, $options: "si" } })
    
     

      return res.status(200).send({
        message:"Success",
        data: antique,
       
      });


    } catch (error) {
      let message = await handleError(error);

      console.error(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

};



