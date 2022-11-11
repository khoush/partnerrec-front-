const condidat=require("../models/condidat")
const   rapport=require("../models/reports")
const PDFDocument = require('pdfkit');
const path = require("path");
const fs = require('fs');

exports.addcondidat=async(req,res)=>{
try {
    let condidatexiste= await condidat.findOne({Email:req.body.Email})
    if(condidatexiste){
        res.status(401).json("condidat existe")
    }else{
        const newcondidat=new condidat({
            name:req.body.name,
            Email:req.body.Email,
            position:req.body.position,
            Start_date:req.body.Start_date,
            office:req.body.office,
            Age:req.body.Age,
            Salary:req.body.Salary,
        })
        if (req.files.length > 0) {
            req.files.map(file => {
                newcondidat.cv = "http://127.0.0.1:3000/uploadcv/" + file.originalname;
                console.log(file.originalname)
                
            });
          } 
         
        let result =await newcondidat.save()
        res.status(200).json({response:result,msg:"condidat saved "})
    }
} catch (error) {
    console.log(error);
    res.status(400).json("error")
}
}

exports.getallcondidat=async(req,res)=>{
    try {
        let  allcondidat=await condidat.find({archive:false})
        console.log(allcondidat);
        res.status(200).json({result:allcondidat,msg:"all candidats "})
    } catch (error) {
        res.status(400).json("error")
        console.log(error);
    }
}
exports.getonecondidat=async(req,res)=>{
    try {
        let Condidat =await condidat.findById(req.params.id)
        res.status(200).json({result:Condidat,msg:"candidat"})
    } catch (error) {
        res.status(400).json("error")
        console.log(error);

    }
}
exports.archivecondidat=async(req,res)=>{
    try {
        let updatecondidat=await condidat.findByIdAndUpdate({
            _id:req.params.id
        },{
            archive:true
        })
        res.status(200).json({result:updatecondidat,msg:"update avec succes"})
    } catch (error) {
        
    }
}
exports.getallcondidatarchive=async(req,res)=>{
    try {
        let  allcondidat=await condidat.find({archive:true})
        res.status(200).json({result:allcondidat,msg:"all candidats "})
    } catch (error) {
        res.status(400).json("error")
        console.log(error);
    }
}
exports.addrapport=async(req,res)=>{
    try {
     
        const Rapport = new rapport({
            email: req.body.email,
            nom: req.body.nom,
       
        });
    
    
    
        const doccdi = new PDFDocument();
    
          const filename = "Rapport" + req.body.nom ;
          const pdfPath = path.join("upload", filename + ".pdf");
          doccdi.pipe(fs.createWriteStream(pdfPath));
          doccdi
            .font("Helvetica-Bold",20)
            .text(
              `Rapprt  de  Condidat`,{
            color:"red",
              align:"center",
            
            }
            
            )
    
            .moveDown()
            .moveDown()
       
           
            .fontSize(15)
            .text(`*ENTREPRISE :              ` , {
              width: 950,
    
              columns: 2,
            })
            .fontSize(12)
            .text( req.body.entreprise, {
                width: 950,
      
                columns: 2,
              })
            .moveDown()
            .fontSize(15)
           
            .text("*EMAIL     :  " , {
              width: 950,
    
              columns: 2,
            })
            .fontSize(12)
            .text( req.body.email, {
                width: 950,
      
                columns: 2,
              })
            .moveDown()
            .fontSize(15)
            .text("*TELEPHONE  ETREPRISE:  ", {
              width: 950,
    
              columns: 2,
            })
            .fontSize(12)
            .text(req.body.tlf, {
                width: 950,
      
                columns: 2,
              })
            .moveDown()
            .fontSize(15)
            .text("*TELEPHONE  CONDIDAT    :  ", {
              width: 950,
    
              columns: 2,
            })
            .fontSize(12)
            .text(req.body.phonenumber, {
                width: 950,
      
                columns: 2,
              })
            .moveDown()
            .fontSize(15)
            .text("*NOM :  ", {
              width: 950,
    
              columns: 2,
            })
            .fontSize(12)
            .text(req.body.nom, {
                width: 950,
      
                columns: 2,
              })
            .moveDown()
            .fontSize(15)
            .text("*NIVEAU :  ", {
              width: 950,
    
              columns: 2,
            })
            .fontSize(12)
            .text(req.body.niveau, {
                width: 950,
      
                columns: 2,
              })
            .moveDown()
            .fontSize(15)
            .text("*OBSERVATION :  ", {
              width: 950,
    
              columns: 2,
            })
            .fontSize(12)
            .text(req.body.observation, {
              width: 950,
    
              columns: 2,
            })
            
            
    
          doccdi.end();
          Rapport.rapport="http://127.0.0.1:3000/"+pdfPath

          const resultat = await Rapport.save();
          console.log(resultat);
    
        res.status(200).json({  resultat });
      } catch (error) {
        res.status(400).json(error);
        console.log(error);
      }
}