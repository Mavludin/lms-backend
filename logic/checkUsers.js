const fs = require("fs");
const path = require("path");

const checkUsers = (req, res) => {
    const pathToTeachers = path.join(
        __dirname,
        "..",
        "data",
        "./teachers.json"
    );

    const pathToStudents = path.join(
        __dirname,
        "..",
        "data",
        "./students.json"
    );

    const userData = req.body;

    if (!userData.userName && !userData.email || !userData.password || !userData.type) {
        res
            .status(400)
            .send({ success: false, message: "Обязательные поля пользователя: userName/email, password, type" });
        return;
    }

    console.log(userData);

    const { userName, email, password, type } = userData;

    const pathToFile = type === 'student' ? pathToStudents : pathToTeachers;

    fs.readFile(pathToFile, "utf8", (err, data) => {
        if (err) {
            res
                .status(500)
                .send({ success: false, message: "Что-то пошло не так" });
            return;
        }

        data = JSON.parse(data);

        console.log(data);

        const foundUser = data.find(
            (user) => (user.email === email || user.userName === userName) && user.password === password && user.type === type
        );

        if (!foundUser) {
            res
                .status(404)
                .send({ success: false, message: "Пользователь не найден" });
            return;
        }

        delete foundUser.password

        res.status(201).json({ success: true, data: foundUser });
        return;
    });
}

module.exports = checkUsers;