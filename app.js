const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const db = require('./connection')

app.use(bodyParser.json());

app.get('/',async (req, res) => {
    try {
        let data = await db.query("SELECT * FROM users ORDER BY userID ASC")
        let message = {
            status : 200,
            message : "Data Success",
            data : data.rows,
            total: data.rowCount
        }
        res.send(message)
    } catch (error) {
        res.send(error)
    }
})


app.post("/route/post", async (req, res) => {
    try {
        let name = req.body?.name
        const data =  await db.query("INSERT INTO users (name) VALUES ($1) RETURNING *", [name]);
        console.log(data)
        let message = {
            data: data?.rows,
            total: data?.rowCount,
            status: 200,
            message: "Data Success",
        }
        res.send(message)
    } catch (error) {
        res.send(error)
    }
})

app.put("/route/put/:ID",async (req, res) => {
    try {
        let IDS = req?.params?.ID;
        let name = req?.body?.name;
        let data = await  db.query("UPDATE users SET name = $1 WHERE userID = $2 RETURNING *", [name, IDS]);
        let message = {
            data: data?.rows,
            total: data?.rowCount,
            status: 200,
            message: "Data Success",
        }
        res.send(message)
    } catch (error) {
        
    }
})

app.patch("/route/patch", (req, res) => {
    res.send("Ini Patch")
})

app.delete("/route/delete/:IDS", async (req, res) => {
    // delete action
    try {
        let IDS = req?.params?.IDS;
        let data = await db.query("DELETE FROM users WHERE userID = $1 RETURNING *", [IDS]);
        let message = {
            data: data?.rows,
            total: data?.rowCount,
            status: 200,
            message: "Data Success Deleted",
        }
        res.send(message)
    } catch (error) {
        
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})