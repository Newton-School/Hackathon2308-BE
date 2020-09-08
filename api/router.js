const express=require('express');
const router=express.Router();
const Issues=require('../models/dataSchema');



router.post("/api/add-issues",(req,res)=>{
    const issues=new Issues(req.body)
    console.log(issues);
    issues.save().then(saved=>{res.json({Status:"Sucess",Message:"Issues Added Sucessfully"});}).catch(err=>res.json({Status:"Fail",Message:"Eror Occure"}))
})


router.patch("/api/update-issues/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        const status=await Issues.findByIdAndUpdate(id,{state:"close"});
        console.log(status);
        res.json({
            Status: status,
            Message: "1 record updated successfully"
        }
        )
    } catch (error) {
        res.status(404).json({
            Status: "failed",
            Message: "1 record updated failed"
        })
    }
})

router.delete("/api/delete-issue/:id",async(req,res)=>{
    const id=req.params.id;
    try {
        const status=await Issues.findByIdAndDelete(id);
        res.json({"Status":"sucessful","Message":"Successfully deleted 1 record",})
    } catch (error) {
        res.status(404).json({"Status":"fail","Message":'something went wrong'})
    }
})


router.get("/api/list-issues",async(req,res)=>{
    
    const page=req.query.page;

    const startIndex=(page-1)*10;
    const endIndex=page*10;
    const results={};
    
    const count =await Issues.count({})
    
    // if(endIndex<count){
        results.next=Math.ceil(parseFloat(count)/10)
    // }
    results.current=parseInt(page);
    if(startIndex>0){
        results.previous=page-1
    }
    // if(endIndex<count){
    //     results.next=results.current+1;
    // }
try {
    results.result=await Issues.find().limit(10).skip(startIndex).exec()    
} catch (error) {
    res.status(500).json({"status":"failed","Message":error.message})
}
// console.log(results);
   res.json(results)
})

module.exports=router;
