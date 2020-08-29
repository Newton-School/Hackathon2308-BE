const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Issues = require('./models/dataSchema');
const bodyParser = require("body-parser");
const port = process.env.PORT||5000
const serialiser = require('node-serialize')
const mysql = require('mysql');

// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());


if(process.env.NODE_ENV==="production"){

  app.use(express.static('Hackathon2308-FE/build'));

  app.get('*',(req,res)=>{
      res.sendFile(path.resolve(__dirname+'/Hackathon2308-FE/build/index.html'));
  });
}


mongoose.connect("mongodb+srv://umesh:umesh@hackathon.ecqkv.mongodb.net/githubissues?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("mongo db connected"))
    .catch((err)=>console.log(err))



app.get('/', (req, res) => res.json('Hello World!'))


// your code goes here
app.use("/api",require('./api/router'))
// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;