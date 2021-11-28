const express = require("express");
const server = require("http")
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./Database/config.js");

const mongoose = require("mongoose");
const apiRouter = require("./Routes/api");
const authCustomerRouter = require("./Routes/Customer/auth");


connectDB();

const app = express();


// Middlewares
app.use(express.json());
app.use(cors());
app.use(express.static("public"));



app.use("/api", apiRouter.router.adminRoutes);



//customer
app.use("/api/customer", apiRouter.router.customerRoutes);
app.use("/auth/customer", authCustomerRouter);




app.get("/", (req, res) => {
  res.status(200).send({
    message: "Welcome !",
  });
});
app.get("/connection", (req, res) => {
  try {
   
    res.status(200).send({
      message:`Database Connection: ${mongoose.connection.readyState}`
    
    });
    
  } catch (error) {
    res.status(400).send({
      message:error
    });
    process.exit(1);
  }
 
});



 
 

const PORT = process.env.PORT || 3000;


app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode in port ${PORT}`)
  
);


