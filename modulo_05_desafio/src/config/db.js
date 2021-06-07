const { Pool } = require("pg");

module.exports = new Pool ({
    user: "postgres",
    password: "gamerock8",
    host: "localhost",
    port: 5432,
    database: "my_teacher"
})