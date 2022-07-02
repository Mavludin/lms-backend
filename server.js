const express = require('express');

const app = express();

const path = require('path');

const sum = require('./test/functions');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/build')))

const users = require('./data/users.json');
const assignments = require('./data/assignments.json');
const solutions = require('./data/solutions.json');

app.get('/api/users', (req, res) => {
  res.status(200).json({ success: true, data: users });
});

app.get('/api/assignments', (req, res) => {
   res.status(200).json({ success: true, data: assignments });
 });

app.post('/api/solutions', (req, res) => {
 const { studentId, body } = req.body;

 if (studentId && body) {

   const func = sum(body);
   const result = func(1, 2);

   if (result === 3) {
      res.status(201).json({ success: true, data: { id: 1, studentId, body }, info: 'Решение верное' });
      return;
   }
   res.status(400).send({ success: false, info: 'Решение неверное' });

 } else if (!studentId && body) {
    res.status(400).send({ success: false, message: 'Укажите идентификатор студента' });
 } else if (studentId && !body) {
    res.status(400).send({ success: false, message: 'Отправьте решение' });
 } else {
    res.status(400).send({ success: false, message: 'Решение и идентификатор студента не указаны' });
 }
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000...');
});
