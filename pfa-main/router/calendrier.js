const express=require("express")
const router = express.Router()
const eventcontrrollers=require("../controllers/calendrier")

router.post("/addevent",eventcontrrollers.addevent)
router.get("/getallevent",eventcontrrollers.getallevent)

module.exports=router
  