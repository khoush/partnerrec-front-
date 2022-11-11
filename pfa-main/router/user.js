const express=require("express")
const router = express.Router()
const usercontroller=require("../controllers/user")

const   multer=require("multer")


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
  

router.post("/login",usercontroller.login)
router.get("/getoneuser/:id",usercontroller.getoneuser)
router.put("/updateuser/:id",upload.any("image"),usercontroller.modifier_user)
router.post("/reset_pwd_verify/:token",usercontroller.reset_pwd_verify);
router.post("/changepassword",usercontroller.changepassword);
router.post("/forget_password",usercontroller.forget_password);


module.exports=router