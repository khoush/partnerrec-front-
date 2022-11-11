const express=require("express")
const router = express.Router()
const condidatcontroller=require("../controllers/condidat")

const multer = require("multer");


const storage = multer.diskStorage({
  
  destination: function (req, file, callback) {
    callback(null, "./uploadcv");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

const uploads = multer({
  storage: storage,
});
const storage1 =multer.diskStorage({
   
  destination:function(req,file,callback){
    callback(null,'./upload');
  },
  filename:function(req,file,callback){
      callback(null,file.originalname) ;
  }
});

const upload=multer({
  storage1: storage1,
 
})

router.post("/addcondidat",uploads.any("file"),condidatcontroller.addcondidat)
router.get("/getallcondidat",condidatcontroller.getallcondidat)
router.get("/getonecondidat/:id",condidatcontroller.getonecondidat)
router.get("/getallcondidatarchive",condidatcontroller.getallcondidatarchive)
router.put("/getallcondidatarchive/:id",condidatcontroller.archivecondidat)


module.exports=router