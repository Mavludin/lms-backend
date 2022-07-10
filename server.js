const express = require("express");

const app = express();

const path = require("path");

const sum = require("./test/functions");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));

const studentStats = require("./data/studentStats.json");
const openAssignments = require("./data/openAssignments.json");
const addAssignment = require("./logic/addAssignment");
const removeAssignment = require("./logic/removeAssignment");

const openLessons = require("./data/openLessons.json");
const addLesson = require("./logic/addLesson");
const removeLesson = require("./logic/removeLesson");

app.get("/api/users", (req, res) => {
  const users = require("./data/users.json");
  res.status(200).json({ success: true, data: users });
});

app.get("/api/assignments", (req, res) => {
  const assignments = require("./data/assignments.json");
  res.status(200).json({ success: true, data: assignments });
});

app.get("/api/open-assignments", (req, res) => {
  res.status(200).json({ success: true, data: openAssignments });
});

app.post("/api/open-assignments", (req, res) => {
  addAssignment(req, res);
});

app.delete("/api/open-assignments/:asgmtId", (req, res) => {
  removeAssignment(req, res);
});

app.get("/api/open-lessons", (req, res) => {
  res.status(200).json({ success: true, data: openLessons });
});

app.post("/api/open-lessons", (req, res) => {
  addLesson(req, res);
});

app.delete("/api/open-lessons/:lessonId", (req, res) => {
  removeLesson(req, res);
});

app.get("/api/student-stats", (req, res) => {
  res.status(200).json({ success: true, data: studentStats });
});

app.get("/api/student-stats/:studentId", (req, res) => {
  const { studentId } = req.params;

  const studentStatsItem = studentStats.find((student) => {
    return student.studentId === +studentId;
  });

  if (studentStatsItem) {
    res.status(200).json({ success: true, data: studentStatsItem });

    return;
  } else {
    res
      .status(404)
      .send({ success: false, message: "Данных о студенте не найдено" });
  }
});

app.post("/api/solutions", (req, res) => {
  const { studentId, body } = req.body;

  if (studentId && body) {
    const func = sum(body);
    const result = func(1, 2);

    if (result === 3) {
      res
        .status(201)
        .json({
          success: true,
          data: { id: 1, studentId, body },
          info: "Решение верное",
        });
      return;
    }
    res.status(400).send({ success: false, info: "Решение неверное" });
  } else if (!studentId && body) {
    res
      .status(400)
      .send({ success: false, message: "Укажите идентификатор студента" });
  } else if (studentId && !body) {
    res.status(400).send({ success: false, message: "Отправьте решение" });
  } else {
    res
      .status(400)
      .send({
        success: false,
        message: "Решение и идентификатор студента не указаны",
      });
  }
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000...");
});
