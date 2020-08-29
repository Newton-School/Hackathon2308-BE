const express=require('express');
const router=express.Router();
const Issues=require('../models/dataSchema')



router.post("/add-issues",(req,res)=>{
    console.log(req.body);

    const issues=new Issues(req.body)
    // console.log(issues);
    issues.save().then(saved=>{res.json(saved);console.log(saved);}).catch(err=>res.json(err))
})

router.get("/list-issues",async(req,res)=>{
    
    const page=req.query.page;

    const startIndex=(page-1)*10;
    const endIndex=page*10;
    const results={};
    
    const count =await Issues.count({})
    console.log(count);
    if(endIndex<count){
        results.next=Math.ceil(parseFloat(count)/10)
    }
    results.current=parseInt(page);
    console.log(page);
    if(startIndex>0){
        results.previous=page-1
    }
try {
    results.result=await Issues.find().limit(10).skip(startIndex).exec()    
} catch (error) {
    res.status(500).json({status:failed,Message:error.message})
}
// console.log(results);
   res.json(results)
})

module.exports=router;
