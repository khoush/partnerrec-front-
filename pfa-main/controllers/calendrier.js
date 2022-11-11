const event=require("../models/clandrier")
const moment =require("moment")

exports.addevent= async(req, res) => {
    try{
        
        
   let datedebut =req.body.start 
        let datefin=req.body.end
      
        let existe_date=await  event.countDocuments({
            start:{
                $gte:datedebut,
                $lte:datefin
            }
        })>0
        let existe_date1=await  event.countDocuments({
            end:{
                $gte:datedebut,
                $lte:datefin
            }
        })>0

 if(existe_date|| existe_date1){
    res.status(401).json("date déja reserver ")
    console.log("date déja existe");
 }else{
    let newmeet= new event({
        title:req.body.title,
        start:req.body.start,
        end:req.body.end,

        
    }) 
    console.log(newmeet);
   
    let result=await newmeet.save()
    res.status(200).json({response:result,msg:"ajouter avec succes "})

 }
}catch(erorr){
    console.log(erorr);
    res.status(400).json("error")
}
};
exports.getallevent=async(req,res)=>{
    try {
        let tab=[]
        let  allevent=await event.find()
        let events= JSON.parse( JSON.stringify(allevent))
        events.map(elem=>{

            elem.start= moment(new Date(elem.start)).format("YYYY-MM-DD")
          
            elem.end= moment(new Date(elem.end)).format("YYYY-MM-DD")
            tab.push(elem)
            console.log(elem);
        })
        
        
        console.log(events);
      
        console.log(tab);
        res.status(200).json(tab)
    } catch (error) {
        res.status(400).json("error")
        console.log(error);
    }
}