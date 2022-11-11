const db = require('./databases/connect');
const express = require('express');
const path = require("path");
const cors = require("cors");
const app = express();
const schedule = require('node-schedule');
const moment = require('moment');
const meetting=require("./models/meeting")
const eventmodel=require("./models/clandrier")

const server = require('http').Server(app)
const io = require('socket.io')(server,{cors:{origin: "*"}})

const projetrouter=require('./router/projet')
const condidatrouter = require('./router/condidat')
const event = require('./router/calendrier')
const meeting = require('./router/meeting')
const bodyParser=require('body-parser');  
const pdf = require('./router/report');
const user = require('./router/user');
const rapport = require('./router/report');

const postrouter=require('./router/post');

app.use(cors({origin: true, credentials: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(bodyParser.urlencoded({extended:false}))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", " ,content-type");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  
  next();

});
app.use(bodyParser.json());
app.use("/admin",projetrouter)

app.use("/admin",condidatrouter)
app.use("/admin",event)
app.use("/admin",meeting)
app.use("/admin",pdf)
app.use("/admin",user)
app.use("/admin",postrouter)
app.use("/admin",rapport)


db();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/upload',express.static('upload'))
app.use('/uploadcv',express.static('uploadcv'))
io.on("connection",(socket) => {
  try {
    
  
  console.log("first")

  schedule.scheduleJob('* * * * *', async ()=> {

    var date = moment(new Date()).format("DD-MM-YYYY hh:mm")
    


   let meet = await  meetting.find()
  meet.map(async(elem)=>{
   
    let Mom=moment(new Date(elem.date_debut)).format("DD-MM-YYYY hh:mm")

 
    let exist= date > Mom
     
if(date > Mom){
   await  meetting.findByIdAndDelete({_id:elem._id})
  }
   
   
  })
    
  
 
  

  
     let meettrue = await  meetting.find({archive:false})
  
   socket.emit("meet",meettrue);
   
  
   
  })
  schedule.scheduleJob('*/15 * * * *', async function(fireDate){
    var date = moment(new Date()).format("YYYY-MM-DD  hh:mm")
    var today = moment();
  
   let notification = await  meetting.find({date_debut : {$gte: date}})
   let notificationevent = await  eventmodel.find({start : {$gte: date}})
    console.log(notification);
    notification.map((rdv)=>{
      var diff = moment(rdv.date_debut).diff(today, 'minutes');
    
      if (diff <= 20 && diff >= 0) {
        socket.emit('newmeet', diff);
      console.log(diff);

      }
    })
    notificationevent.map((rdv)=>{
      var diff = moment(rdv.start).diff(today, 'minutes');
     
      if (diff <= 20 && diff >= 0) {
        socket.emit('newevent', diff);
       console.log(diff);

      }
    })
  });


} catch (error) {
    console.log(error);
}
}



)


const port =3000;
 server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


