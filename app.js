const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const indexRoute = require('./routes/index')

app.use(bodyParser.json());

app.use(indexRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})