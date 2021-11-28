const User = require("../../Database/Models/User");
const handleError = require("../../utils/helper").handleErrors;
const validateInputs = require("../../utils/helper").validateInputs;
const validationAttributes = require("../../config/validation-attributes.json")
  .customer.signup;
  const jwt = require("jsonwebtoken");


module.exports = {
  signin: async (req, res) => {
    try {
      let inputParams = req.body;
    
      const otp = Math.floor(1000 + Math.random() * 9000);
      const user = await User.findOne({
        phone: inputParams.phone,
        type: inputParams.type,
      });

      if (user) {
      
          await User.findOneAndUpdate({ _id: user._id }, { otp});
         
          
          return res
            .status(200)
            .send({ message: "OTP sent successfully", data: { otp: otp } });
        
      } else {
        

        return res.status(400).send({
          message:"Login failed. The user does not exist.",
        });
      }
    } catch (error) {
        let message = await handleError(error);

      console.error(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },
  otp: async (req, res) => {
    try {
      let inputParams = req.body;
     
      let user;
      if (inputParams.otp && inputParams.phone) {
      
          user = await User.findOne({
            // otp: inputParams.otp,
            phone: inputParams.phone,
            });
      

          
        
        if (user) {
          const privateKey = process.env.ACCESS_TOKEN_SECRET;
          const token = jwt.sign(
            { USER_ID: user._id, USER_TYPE: user.type },
            privateKey
          );
       
          user.otp = "";
          await user.save();

          return res.status(200).send({
            data: { token: token, user: user },
          });
        } else {
         
          return res.status(400).send({
            message:"OTP verification failed.",
          });
        }
      } else {
       
        return res.status(400).send({
          message: "Phone and Otp field is required.",
        });
      }
    } catch (error) {
        let message = await handleError(error);
      console.error(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

  signup: async (req, res) => {
    try {
      let inputParams = req.body;
     

      if (inputParams.name) {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const user = await User.findOne({
         
          phone: inputParams.phone,
          type: inputParams.type,
        }).exec();
        if (user) {
       
          return res.status(400).send({
            message: "User already exists",
          });
        } else {
          inputParams.otp = otp;

          let users = await User.create(inputParams);

         
       

          return res
            .status(200)
            .send({ message: "OTP sent successfully", data: { otp: otp } });
        }
      } else {
       
        return res.status(400).send({
          message: "Name is required",
        });
      }
    } catch (error) {
      let message = await handleErrorsCustomer(error);

      console.error(error);
      return res.status(400).send({
        error: error,
        message,
      });
    }
  },

  validate: async (req, res, next) => {
    // Validate input parameters

    let inputParams = req.body;
    const inputValidation = await validateInputs(
      inputParams,
      validationAttributes
    );

    if (!inputValidation.success) {
      return res.status(404).send({
        message: inputValidation.message,
        error: inputValidation.errors,
      });
    }
    if (inputParams.phone) {
      if (inputParams.phone.length < 8) {
       

        return res.status(404).send({
          message: "Phone Number must have 10 digit!",
          error: "Phone Number must have 10 digit!",
        });
      }
    }

    next();
  },

};

