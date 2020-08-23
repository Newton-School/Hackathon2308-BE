const express=require('express')
const router=express.Router()
const bodyparser=require('body-parser');
const Users= require('../models/users')
const Product= require('../models/product')

 router.get('/issues', async (req,res)=>{
     console.log('Get request');
     try{
          const dbresponse=await Product.find();
          console.log(dbresponse);
          res.send(dbresponse)

   }catch(err){
         res.json({message:err})
         res.send({
             Status:"failed",
             Message:"0 Records fetched"
         })
      }
  })


 router.delete('/delete-issue/:id', async (req,res)=>{
   console.log('Delete request',req.params.delId);
    try{
         const dbresponse=await Product.remove({_id:req.params.id});
         console.log(dbresponse);
        // res.json(dbresponse);
        const obj={
            Status: "successful",
         Message: "1 record deleted successfully"
         };
        res.send(obj);
    }catch(err){
        res.json({message:err})
        res.send({
                Status: "failed",
             Message: "0 record deleted"
        });
    }
})

 router.patch('/update-issue/:id', async (req,res)=>{
     console.log('Update request');
    try{
         const dbresponse=await Product.updateOne({_id:req.params.id},{$set:{shortDescription:req.body.shortDescription,description:req.body.description}});
         console.log(dbresponse);
         //res.json(dbresponse);
         const obj={
            Status: "successful",
         Message: "1 record updated successfully"
         };
         
         res.send(obj);
    }catch(err){
        res.json({message:err})
        res.send({
            Status: "failed",
         Message: "0 record updated "
        })
    }
})



 

 //issues post 

 router.post('/add-issue', (req,res)=>{
  
    console.log(req.body);
    var obj={
        Status: "successful",
        Message: "1 record inserted successfully",
    };
    

   
    //let errors=[]
    let shortDescription=req.body.shortDescription;
    let description=req.body.description;
    let id=req.body.id;
    let name=req.body.name
    let url=req.body.url
    let number=req.body.number
    let date=req.body.date
    let label=req.body.label
    let state=req.body.state
    let locked=req.body.locked
    
    const product=new Product({
    shortDescription,
         description,
         date,
         id,
         name,
         url,
         number,
         label,
         state,
         locked
       });
 
       product.save()
         .then(user=>{
             console.log('product is ',user);
             res.send(obj);
         }).catch(err=>{console.log('error is ',err);
         res.send({
                Status: "failed",
                Message: "0 record inserted",
         });
        })
  
  });
module.exports= router
