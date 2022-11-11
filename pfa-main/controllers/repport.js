const rapport=  require("../models/reports")
exports.getrapport=async(req,res)=>{
  try {
    let Rep= await rapport.find()
    res.status(200).json(Rep)
  } catch (error) {
    console.log(error);
  }
}