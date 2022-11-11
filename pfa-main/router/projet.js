const express=require("express")
const router = express.Router()
const projetcontroller=require("../controllers/projet")
const multer = require('multer');
const storage =multer.diskStorage({
   
    destination:function(req,file,callback){
      callback(null,'./upload');
    },
    filename:function(req,file,callback){
        callback(null,file.originalname) ;
    }
  });
  
  const upload=multer({
    storage: storage,
   
  })
router.post("/addprojet/:id", upload.any('image'),projetcontroller.addproject)
router.get("/getallprojet",projetcontroller.getallprojet)
router.get("/getoneprojet/:id",projetcontroller.getoneproject)
router.get("/getallprojetarchive",projetcontroller.getallprojet)
router.put("/getallprojetarchive/:id",projetcontroller.archiveprojet)
module.exports=router
  