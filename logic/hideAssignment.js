const fs = require("fs");
const path = require("path");

const hideAssignment = (req, res) => {
  const pathToFile = path.join(
    __dirname,
    "..",
    "data",
    "./openAssignments.json"
  );
  const { asgmtId } = req.params;

  if (!asgmtId) {
    res
      .status(400)
      .send({ success: false, message: "Нет идентификатора задачи" });

    return;
  }
  
  fs.readFile(pathToFile, "utf8", (err, data) => {
    const copy = [...JSON.parse(data)].filter(
      (asgmtNum) => asgmtNum !== +asgmtId
    );
    if (err) {
      res
        .status(500)
        .send({ success: false, message: "Что-то пошло не так" });
      return;
    }

    fs.writeFile(pathToFile, JSON.stringify(copy), "utf8", (err) => {
      if (!err) {
        res.status(200).json({ success: true, data: copy });
        return;
      }
      res
        .status(500)
        .send({ success: false, message: "Что-то пошло не так" });
    });
  });
}

module.exports = hideAssignment;
