const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
const serialiser = require("node-serialize");
const mysql = require("mysql");
const env = require("dotenv").config();
app.use(express.urlencoded());
const initialRoute = require("./routes");

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

var connection = mysql.createConnection({
  host: process.env.DB_END_POINT,
  user: process.env.DB_USER_NAME,
  database: process.env.DB_DATABASE_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT_NUM,
});

connection.connect();
app.get("/", initialRoute);

// your code goes here

// here

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
