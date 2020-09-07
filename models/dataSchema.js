const mongoose=require('mongoose');
const IssuesSchema= new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    url:{
        type:String,
    },
    number:{
        type:Number,
    },
    label:{
        type:String,
    },
    state:{
        type:String,
    }
}
)


module.exports=mongoose.model("Issue",IssuesSchema);