const app = require("express")();

app.get("/", (req, res) => {
  res.send("hai");
});

exports = app;
