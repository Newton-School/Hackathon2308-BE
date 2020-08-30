const queries = require("../models/query");

exports.addIssue = (req, res, next) => {
  let { id, name, description, url, number, label, state, locked } = req.body;
  console.log(
    "in add issue",
    id,
    name,
    description,
    url,
    number,
    label,
    state,
    locked,
    JSON.stringify(queries)
  );
  if (!id || !name || !description || !url || !number || !state)
    return res
      .status(400)
      .send({ status: "failed", message: "Absence of mandatory fields" });
  locked = !locked ? false : locked;
  label = !label ? "" : label;
  mysql.query(
    queries.addSingleIssue,
    [
      {
        id,
        name,
        description,
        url,
        number,
        label,
        state,
        locked,
      },
    ],
    function (err, result) {
      if (err) {
        err.status = 400;
        return next(err);
      }
      console.log(result);
      res.status(201).send({
        status: "Success",
        message: `${result.affectedRows} record inserted successfully`,
      });
    }
  );
};

exports.getIssues = (req, res, next) => {
  let { page } = req.params;
  if (!page) return res.sendStatus(400);
  page = (page - 1) * 10;

  mysql.query(queries.getAllIssues, [page], function (err, result) {
    if (err) {
      err.status = 404;
      return next(err);
    }
    console.log(result.length);
    res.status(200).send({
      status: "success",
      message: `Successfully fetched ${result.length} records`,
      Issues: result,
    });
  });
};

exports.updateIssues = (req, res, next) => {
  let { id } = req.params;
  let { name, description, url, number, label, state, locked } = req.body;
  if (!id || (!name && !description && !url && !number && !state))
    return res
      .status(400)
      .send({ status: "failed", message: "Absence of mandatory fields" });
  mysql.query(
    queries.updateIssue,
    [{ name, description, url, number, label, state, locked }, { id }],
    function (err, result) {
      if (err) {
        return next(err);
      }
      res.status(200).send({
        status: "Success",
        message: `${result.affectedRows} record updated successfully`,
      });
    }
  );
};

exports.deleteIssues = (req, res, next) => {
  let { id } = req.params;
  if (!id)
    return res
      .status(400)
      .send({ status: "Failed", message: "absence of mandatory field id" });

  mysql.query(queries.deleteIssue, [id], function (err, result) {
    if (err) {
      return next(err);
    }
    res.status(200).send({
      status: "success",
      message: `${result.affectedRows} record deleted successfully`,
    });
  });
};
