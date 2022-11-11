const User=require("../models/user")
let sekretkey="zlknrjthkerjtelrjtelrjtk51255"
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
var generator = require('generate-password');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "younesmanita975@gmail.com",
    pass: "tpopzhhpcswkfpqo",
  },
  tls: {
    rejectUnauthorized: false,
  },
});



var passwords = generator.generateMultiple(3, {
	length: 10,
	uppercase: false
});
//forget password:
exports.forget_password = async (req, res) => {
  let {
    email
  } = req.body;
console.log(email);
  let user = await User.findOne({
    email: email
  });
  if (!user) return res.status(404).json("user do not exist");
  let user_secret = passwords
  await User.findOneAndUpdate({
    email: email
  }, {
    passwordHash: user_secret +"" 
   
  });
  console.log(user_secret)
  let inside_token = user.password_last_update.toString() + user_secret + "";
  let reset_token = jwt.sign({
      _id: user._id,
    },
    inside_token, {
      expiresIn: "1d"
    }
  );
  const token = jwt.sign({
      _id: user._id,
      token: reset_token,
    },
    sekretkey

  );

  try {
    transporter.sendMail({
        from: "younes manita ",
        to: req.body.email,
        subject: "mot de passe oublier",
        html: `svp  utilisez le lien suivant pour récupérer votre mot de passe: http://localhost:8080/change_password/${token}`,
      },
      (errr, info) => {
        if (errr) {
          console.log(errr);
          return res.status(400).json({
            message: {
              error: errr,
            },
          });
        }
        console.log(info);
        return res.status(200).send("mail envoyer ");
      }
    );
  } catch (e) {
    console.log(e)
    return res.status(400).json({
      message: {
        error: err,
      },
    });
  }
}


exports.reset_pwd_verify = async (req, res) => {
  let token = req.params.token;
  console.log(token)
  try {
    const verified = jwt.verify(token,sekretkey);

    let user = await User.findOne({
      _id: verified._id
    });
    let inside_token =
      user.password_last_update.toString()+"" + user.passwordHash + "";
    const reset_token_verification = jwt.verify(verified.token, inside_token);
    res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(401).send("Invalid Token");
  }
}

exports.changepassword = async (req, res) => {
  const {
    password,
    token
  } = req.body;
  try {
    const verified = jwt.verify(token, sekretkey);

    let user = await User.findOne({
      _id: verified._id
    });
    let inside_token =  user.password_last_update.toString() + user.passwordHash + "";
    const reset_token_verification = jwt.verify(verified.token, inside_token);

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await User.findOneAndUpdate({
      _id: verified._id
    }, {
      password: hashed
    });
    res.sendStatus(200);
  } catch (error) {
    return res.status(401).send("Invalid Token");
  }
}



exports.login = async (req, res) => {
    
  
    try {
   
      const searchedUser = await User.findOne({ email:req.body.email });
      console.log(searchedUser);
   
      if (!searchedUser) {
       //  res.status(400).send({ msg: "mauvais identifiant" });
        console.log("error");
      }
   
      const match = await bcrypt.compare(req.body.password, searchedUser.password);
  
      if (!match) {
        // res.status(400).json({ msg: "mauvais identifiant" });
        console.log('error');
      }
    
      const payload = {
        _id: searchedUser._id,
        role: searchedUser.role,
      };
      const token = await jwt.sign(payload,sekretkey, {
        expiresIn: 3600,
      });

      res.status(200).json({user:searchedUser,token:token});
    } catch (error) {
      res.status(400).json({ msg: "ne peut pas obtenir l'utilisateur" });
      console.log(error)
    }
  };
  exports.getoneuser=async(req,res)=>{
    try {
        let user =await User.findById(req.params.id)
        res.status(200).json(user)
        console.log(user);
    } catch (error) {
        res.status(400).json("error")
        console.log(error);

    }
}
exports.modifier_user = async (req, res) => {

  const {
    id
  } = req.params;

 
  const docteur = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    
    email: req.body.email,
   

  };
  if (req.files.length > 0) {
    req.files.map(file => {

      docteur.image = "http://127.0.0.1:3000/upload/" + file.originalname
    })
  }
  if(req.body.password){
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  docteur.password = password;
}
console.log(docteur);
  try {

    const userPassword = await User.findByIdAndUpdate({
      _id: id
    }, {
      ...docteur
    }, {
      new: true
    });
    return res.status(200).json({
      status: true,
      data: userPassword,
      msg: 'success modification profile user '
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      status: false,
      error: "errror de modifier profile user"
    });
  }

}
