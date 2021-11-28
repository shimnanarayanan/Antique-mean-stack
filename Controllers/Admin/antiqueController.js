const Antique = require("../../Database/Models/Antique");

const handleError = require("../../utils/helper").handleErrors;
const removeFile = require("../../utils/helper").removeFile2;

const filePath = "uploads/antique";

module.exports = {
 
  create: async (req, res) => {
    try {

        
      let inputParams = req.body

      // console.log(inputparams)

    //   let antiqueName = await Antique.findOne({
    //     pageKey: slug(inputParams.name),
    //   });

    //   if (antiqueName) {
    //     return res.status(400).json({
    //       message: "Antique Already added",
    //     });
    //   }

    //   if (req.files) {
    //     inputParams = assignFiles(req.files, inputParams);
    //   }
      
    
    

      const antique = await Antique.create(inputParams);

     
    //   antique.pageKey = slug(inputParams.name);

      
    

      return res.status(200).send({
        message:  "Antique created successfully",
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

function assignFiles(files, inputParams, antique = false) {
    let newParams = { ...inputParams };
    try {
      if (files.mainImage) {
        newParams.mainImage = `${filePath}/${files.mainImage[0].filename}`;
        if (antique) {
          removeFile(antique.mainImage);
        }
      }
     
    } catch (error) {
      console.error(error);
    }
  
    return newParams;
  }