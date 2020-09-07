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




mongoose.connect("mongodb+srv://umesh:umesh@hackathon.ecqkv.mongodb.net/githubissues?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
    .then(()=>console.log("mongo db connected"))
    .catch((err)=>console.log(err))



// app.get('/', (req, res) => res.json('Hello World!'))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
// your code goes here
app.use("/",require('./api/router'))
// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;

// const express = require('express')
// const app = express()
// const bodyParser = require("body-parser");
// const port = 3000
// const serialiser = require('node-serialize')
// const mysql = require('mysql');

// app.use(express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// var connection = mysql.createConnection({

//     host     : process.env.DB_END_POINT,
//     user     :process.env.DB_USER_NAME,
//     database : process.env.DB_DATABASE_NAME,
//     port: process.env.DB_PORT_NUM
//   });

// connection.connect();
// app.get('/', (req, res) => res.send('Hello World!'))


// // your code goes here

// // here

// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// module.exports = app;