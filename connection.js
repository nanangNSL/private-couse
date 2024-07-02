require('dotenv').config(
    {path: __dirname + '/.env'}
)
const { Pool} =  require("pg")
const {DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME} = process.env

const pool = new Pool({
    user: DB_USER,
    password: DB_PASSWORD,
    host: DB_HOST,
    port: DB_PORT,
    database: DB_NAME,
})

pool.listeners('error').forEach((listener) => {
    console.log(listener)
})


pool.connect((err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("connected")
    }
})

module.exports = {
    query: (text, params) => pool.query(text, params),
}