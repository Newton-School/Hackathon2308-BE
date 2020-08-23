const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
const serialiser = require('node-serialize')
const mysql = require('mysql');
const mongoose=require('mongoose')
var cors = require('cors')

app.use(cors())
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
var connection = mysql.createConnection({

    host     : process.env.DB_END_POINT,
    user     :process.env.DB_USER_NAME,
    database : process.env.DB_DATABASE_NAME,
    port: process.env.DB_PORT_NUM
  });

app.use(expressLayouts)
app.set('view engine','ejs');
//Middlewares
const postRoute=require('./routes/users.js');
const home=require('./routes/home.js');
app.use('/users',postRoute)
app.use('/',home);

mongoose.connect(process.env.DB_CONNECTION,{useNewUrlParser:true,useUnifiedTopology: true},()=>{
    console.log('connected');
})

connection.connect();
app.get('/', (req, res) => res.send('Hello World!'))

// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`))




 




