const express=require("express")
const router = express.Router()
const condidatcontroller=require("../controllers/condidat")
const   rapportcontroller=require("../controllers/repport")

const multer =require("multer");
const storage =multer.diskStorage({
    //destination de l'image
    destination:function(req,file,callback){
      callback(null,'./upload/');
    },
    filename:function(req,file,callback){
        callback(null,Date.now()+ '-' + file.originalname) ;
    }
});

const upload=multer({
    storage: storage,
   
})
router.post("/addrapport",upload.any("file"),condidatcontroller.addrapport)
router.get("/getallrapport",upload.any("file"),rapportcontroller.getrapport)

module.exports=router
  