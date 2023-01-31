const express = require("express");

const app = express();

const path = require("path");

const sum = require("./test/functions");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/build")));

const studentStats = require("./data/studentStats.json");


const openAssignments = require("./data/openAssignments.json");
const assignments = require("./data/assignments.json");
const openAssignment = require("./logic/openAssignment");
const hideAssignment = require("./logic/hideAssignment");


const openLessons = require("./data/openLessons.json");
const openLesson = require("./logic/openLesson");
const hideLesson = require("./logic/hideLesson");


const alreadyReadLessons = require("./data/alreadyReadLessons.json");
const markLessonAsRead = require("./logic/markLessonAsRead");

app.get("/api/users", (req, res) => {
  const users = require("./data/users.json");
  res.status(200).json({ success: true, data: users });
});

// assignments

app.get("/api/assignments", (req, res) => {
  res.status(200).json({ success: true, data: assignments });
});

app.get("/api/open-assignments", (req, res) => {
  res.status(200).json({ success: true, data: openAssignments });
});

app.get("/api/assignments/:asgmtId", (req, res) => {
  const { asgmtId } = req.params;

  const assignmentItem = assignments.find((assignment) => {
    return assignment.id === +asgmtId;
  });

  if (assignmentItem) {
    res.status(200).json({ success: true, data: assignmentItem });

    return;
  } else {
    res
      .status(404)
      .send({ success: false, message: "Данных о задаче не найдено" });
  }
});

app.post("/api/open-assignments", (req, res) => {
  openAssignment(req, res);
});

app.delete("/api/open-assignments/:asgmtId", (req, res) => {
  hideAssignment(req, res);
});

// open lessons

app.get("/api/open-lessons", (req, res) => {
  res.status(200).json({ success: true, data: openLessons });
});

app.post("/api/open-lessons", (req, res) => {
  openLesson(req, res);
});

app.delete("/api/open-lessons/:lessonId", (req, res) => {
  hideLesson(req, res);
});

// read lessons

app.get("/api/read-lessons", (req, res) => {
  res.status(200).json({ success: true, data: alreadyReadLessons });
});

app.post("/api/read-lessons", (req, res) => {
  markLessonAsRead(req, res);
});

// user stats

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

app.listen(5000, "localhost", () => {
  console.log("Server is listening on port 5000...");
});
