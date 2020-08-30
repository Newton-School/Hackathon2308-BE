const queries = require("../models/query");

exports.addIssue = (req, res) => {
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
    return res.sendStatus(400);
  try {
    mysql.query(
      queries.addSingleIssue,
      [
        {
          id,
          name,
          description,
          url,
          number,
          label: !label ? "" : label,
          state,
          locked: !locked ? false : locked,
        },
      ],
      function (err, result) {
        console.log("error described as ----------------------", err);
        if (err) throw err;
        res.status(201).send({
          status: "Success",
          message: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error(error);
  }
};
