const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostIssue = new Schema({
  id: {
    type: String,
    default: null,
    required: true,
  },
  name: {
    type: String,
    default: null,
    required: true,
  },
  description: {
    type: String,
    default: null,
    required: true,
  },
  url: {
    type: String,
    default: null,
    required: true,
  },
  number: {
    type: Number,
    default: null,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
    required: true,
  },
  locked: {
    type: Boolean,
    default: null,
    required: true,
  },
});

module.exports = ISSUE = mongoose.model("issue", PostIssue);
