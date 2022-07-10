const fs = require("fs");
const path = require("path");

const removeAssignment = (req, res) => {
  const pathToFile = path.join(
    __dirname,
    "..",
    "data",
    "./openLessons.json"
  );
  const { lessonId } = req.params;

  if (!lessonId) {
    res
      .status(400)
      .send({ success: false, message: "Нет идентификатора задачи" });

    return;
  }
  
  fs.readFile(pathToFile, "utf8", (err, data) => {
    const copy = [...JSON.parse(data)].filter(
      (lessonNum) => lessonNum !== lessonId
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

module.exports = removeAssignment;
