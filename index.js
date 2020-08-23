const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB();

app.use(express.json({ extended: true }));

app.get("/", (req, res) => {
  res.send("API Running");
});

app.use("/api/", require("./routes/api/issues"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server is running on PORT ${PORT}`));
