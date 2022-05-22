const mysql = require('mysql');

const connection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "testdb",
    insecureAuth: true,
    timezone: "itc"
})

module.exports = {
    connection
};