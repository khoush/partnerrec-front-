
const meting=require("../models/meeting")


exports.addmetting = async(req, res) => {
    try{
   
        let datedebut =req.body.date_debut 
        let datefin=req.body.date_fin  
      
        let existe_date=await  meting.countDocuments({
            date_debut:{
                $gte:datedebut,
                $lte:datefin
            }
        })>0
       // 
        let existe_date1=await  meting.countDocuments({
            date_fin:{
                $gte:datedebut,
                $lte:datefin
            }
        })>0

 if(existe_date|| existe_date1){
    res.status(400).json("date déja reserver ")
    console.log("date déja existe");
 }else{
    let newmeet= new meting({
        titre:req.body.titre,
        date_debut:req.body.date_debut,
        date_fin:req.body.date_fin,

        
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
exports.archiveprojet=async(req,res)=>{
    try {
        let updatemeet=await meting.findByIdAndUpdate({
            _id:req.params.id
        },{
            archive:true
        })
        res.status(200).json({result:updatemeet,msg:"update avec succes"})
    } catch (error) {
        res.status(400).json("error d'archiver ")
        console.log(error);
    }
}