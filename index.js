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
global.mysql = connection;
app.use("/", initialRoute);

// your code goes here

// here
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.send({ status: "failed", message: err.message });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;
