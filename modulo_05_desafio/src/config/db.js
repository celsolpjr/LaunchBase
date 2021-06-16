const { Pool } = require("pg");

module.exports = new Pool ({
    user: "celso",
    password: "gamerock8",
    host: "localhost",
    port: 5432,
    database: "teacher_students"
})