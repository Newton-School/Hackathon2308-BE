const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const ISSUE = require("../../models/Issue");

// @route    POST api/add-issue
// @desc     Create a issue
// @access   Public
router.post(
  "/add-issue",
  [
    check("id", "ID is Required").not().isEmpty(),
    check("name", "Project Name is Required").not().isEmpty(),
    check("description", "Issue Description is required").not().isEmpty(),
    check("url", "Project URL is Required").not().isEmpty(),
    check("number", "Number is required").not().isEmpty(),
    check("state", "State is required").not().isEmpty(),
    check("locked", "Locked is required").isBoolean(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const {
      id,
      name,
      description,
      url,
      number,
      label,
      state,
      locked,
    } = req.body;
    try {
      const newIssue = new ISSUE({
        id,
        name,
        description,
        url,
        number,
        label,
        state,
        locked,
      });

      const issue = await newIssue.save();
      res.status(200).send("1 record inserted successfully");
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/get-issue
// @desc     GET an issue
// @access   Public

router.get("/list-issue", async (req, res) => {
  const page = req.query.page;
  const limit = req.query.limit;

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  try {
    let issues = await ISSUE.find();
    issues = issues.slice(startIndex, 10);
    res.status(200).send("Successfully fetched 10 records");
    res.json(issues);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PATCH api/update-issue/:id
// @desc     Update an issue
// @access   Public

router.patch("/update-issue/:id", async (req, res) => {
  const { name, description, url, number, label, state, locked } = req.body;
  try {
    let issue = await ISSUE.findById(req.params.id);

    if (issue) {
      issue.name = name;
      issue.description = description;
      issue.url = url;
      issue.number = number;
      issue.label = label;
      issue.state = state;
      issue.locked = locked;
    }
    await issue.save();

    res.status(200).send("1 record updated successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/delete-issue/:id
// @desc     Delete an issue
// @access   Public

router.delete("/delete-issue/:id", async (req, res) => {
  try {
    const issue = await ISSUE.findById(req.params.id);
    await issue.remove();

    res.send("1 record deleted successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
