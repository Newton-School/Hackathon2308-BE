const query = {
  addSingleIssue: "INSERT INTO issues SET ?",
  getAllIssues: "select * from issues limit 10 offset ?",
  updateIssue: "update issues set ? where ? ",
  deleteIssue: "delete from issues where id=?",
};
Object.freeze(query);

module.exports = query;
