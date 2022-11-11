const express=require("express")
const router = express.Router()
const mettingcontrollers=require("../controllers/meeting")

router.post("/addmeetting",mettingcontrollers.addmetting)


module.exports=router
  