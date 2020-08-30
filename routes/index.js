const router = require("express").Router();
const controller = require("../controllers");

router.post("/add-issue", controller.addIssue);
router.get("/add-issue", (req, res) => {
  res.send({ what: "hello" });
});

router.get("/issues/:page", (req, res) => {
  res.send("hai");
});
router.patch("/update-issue/:id", (req, res) => {
  res.send("hai");
});
router.delete("/delete-issue/:id", (req, res) => {
  res.send("hai");
});

module.exports = router;
