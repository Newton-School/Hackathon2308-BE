// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const port = 3000;
// const serialiser = require("node-serialize");
// const mysql = require("mysql");
//  -------------------------------------------------------------
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const issueRoutes = require("./server/issue.routes");
//  ----------------------------------------------------------------

// app.use(express.urlencoded());

// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());
// var connection = mysql.createConnection({
// 	host: process.env.DB_END_POINT,
// 	user: process.env.DB_USER_NAME,
// 	database: process.env.DB_DATABASE_NAME,
// 	port: process.env.DB_PORT_NUM,
// });

// connection.connect();
// app.get("/", (req, res) => res.send("Hello World!"));

// your code goes here --------------------------------------------------------------------

const { NODE_ENV, PORT, DATABASE_URL, CLIENT_URL } = process.env;

const isDevelopment = NODE_ENV === "development";
const ACTIVE_PORT = PORT || 8000;

if (isDevelopment) {
	app.use(morgan("dev"));
} else {
	app.use(morgan("combined"));
}

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

if (isDevelopment) {
	app.use(cors());
} else {
	app.use(cors({ origin: CLIENT_URL, optionsSuccessStatus: 200 }));
}

app.use("/api", issueRoutes);

if (NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "frontend/build")));

	app.get("*", function (req, res) {
		res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
	});
}

mongoose
	.connect(DATABASE_URL, {
		useCreateIndex: true,
		useFindAndModify: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(ACTIVE_PORT, () => {
			console.log(`DB Connected and the server is running at PORT ${PORT}`);
		});
	})
	.catch(err => {
		console.error("DB Connection Failed", err);
	});

// here ----------------------------------------------------------------------------

// app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// module.exports = app;
