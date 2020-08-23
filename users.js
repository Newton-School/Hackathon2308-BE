const express=require('express')
const router=express.Router()
const bodyparser=require('body-parser');
const bcrypt=require('bcryptjs');
const Users= require('../models/users')
const Product= require('../models/product')
const passport=require('passport');


router.get('/login',(req,res)=>{
    res.render('login')
})

router.get('/register',(req,res)=>
    res.render('register'))

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

// router.get('/:postId', async (req,res)=>{
//     console.log('Get unique request');
//     try{
//          const dbresponse=await Users.findById(req.params.postId);
//          console.log(dbresponse);
//          res.json(dbresponse);

//     }catch(err){
//         res.json({message:err})
//     }
// })

router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out');
    res.redirect('login');
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

 router.post('/register', (req,res)=>{
  
   console.log(req.body);
   let errors=[]
   const {name,email,password,password2}=req.body;
  // res.send('ewfefe');
 
  // check required fields
   if(!name || !email || !password || !password2){
      errors.push({msg:'Please fill in all fields'});
   }

  //check password match

  if(password!==password2){
      errors.push({msg:"Password do not match"});
  }
  
  //password length

  if(password.length<6){
    errors.push({msg:"Password should be atleast 6 characters"});
}

if(errors.length>0){
   // res.setHeader("Content-Type", "text/html");
   res.render('register',{
      errors,
      name,
      email,
      password,
      password2      
   });
}else{
    //Validation passed
    Users.findOne({email:email})
    .then(user=>{

        if(user){
           //User exists already
           errors.push({msg:'Email is already registered'})
            res.render('register',{
            errors,
            name,
            email,
            password,
            password2
            })
        }else{
          const newUser=new Users({
              name,
              email,
              password
          });

          //console.log(newUser)
          bcrypt.genSalt(10,(err,salt)=> 
             bcrypt.hash(newUser.password,salt, (err,hash)=>{
        if(err) 
        {
            console.log("Error is: ",err);
        }
        newUser.password=hash;
             newUser.save()
             .then(user=>{
                 req.flash('success_msg','You are now regsitered and you can login');
                 res.redirect('login');
             })
             .catch(err =>console.log(err));
          }))
        }
    });
}



//    const post=new users({
//        name:req.body.name,
//        email:req.body.email,
//        password:req.body.password
//      });

//     try{
//         const result= await post.save()
//         res.json(result);
//     }catch(err){
//         console.log('Error ',err);
//     }
  
    // .then(data=>{
    //     res.json(data);
    // }).catch(err=>{
    //     console.log('error',err);
    // })

 });


 router.post('/login',(req,res,next)=>{
     passport.authenticate('local',{
         successRedirect:'/dashboard',
        failureRedirect:'login',
        failureFlash:true
     })(req,res,next);
 })

 //product post 

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


   // res.send('ewfefe');
  
   // check required fields
    
//      //Validation passed
//      Users.findOne({email:email})
//      .then(user=>{
 
//          if(user){
//             //User exists already
//             errors.push({msg:'Email is already registered'})
//              res.render('register',{
//              errors,
//              name,
//              email,
//              password,
//              password2
//              })
//          }else{
//            const newUser=new Users({
//                name,
//                email,
//                password
//            });
 
//            //console.log(newUser)
//            bcrypt.genSalt(10,(err,salt)=> 
//               bcrypt.hash(newUser.password,salt, (err,hash)=>{
//          if(err) 
//          {
//              console.log("Error is: ",err);
//          }
//          newUser.password=hash;
//               newUser.save()
//               .then(user=>{
//                   req.flash('success_msg','You are now regsitered and you can login');
//                   res.redirect('login');
//               })
//               .catch(err =>console.log(err));
//            }))
//          }
//      });
//  }
 
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
   
    //   .then(data=>{
    //      res.json(data);
    //   }).catch(err=>{
    //       console.log('error',err);
    //   })
 
  });
module.exports= router