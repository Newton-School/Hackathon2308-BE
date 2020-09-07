const router = require("express").Router();
const controller = require("../controllers");

router.post("/add-issue", controller.addIssue);
router.get("/add-issue", (req, res) => {
  res.send({ what: "hello" });
});

router.get("/issues/:page", controller.getIssues);
router.patch("/update-issue/:id", controller.updateIssues);
router.delete("/delete-issue/:id", controller.deleteIssues);

module.exports = router;
