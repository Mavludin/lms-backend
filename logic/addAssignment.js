const fs = require("fs");
const path = require("path");

const addAssignment = (req, res) => {
  const pathToFile = path.join(
    __dirname,
    "..",
    "data",
    "./openAssignments.json"
  );
  const { asgmtId } = req.body;

  if (!asgmtId) {
    res
      .status(400)
      .send({ success: false, message: "Нет идентификатора задачи" });
    return;
  }

  fs.readFile(pathToFile, "utf8", (err, data) => {
    if (err) {
      res.status(500).send({ success: false, message: "Что-то пошло не так" });
      return;
    }

    const copy = [...new Set([...JSON.parse(data), asgmtId])];
    fs.writeFile(pathToFile, JSON.stringify(copy), "utf8", (err) => {
      if (!err) {
        res.status(200).json({ success: true, data: copy });
        return;
      }
      console.log("err", err);
      res.status(500).send({ success: false, message: "Что-то пошло не так" });
    });
  });
};

module.exports = addAssignment;
