const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.get('/', (req, res) => {
    console.log(req.body)
    try {
        if(Object.keys(req?.body).length > 0){
            let data = req?.body?.data;
            if(data){
                let conversionKeNumber = Number(data);
                let initial = 0;
                let result = [];
                for(initial; initial < conversionKeNumber; initial++){
                    let data = initial+1
                    result.push("data ke-" + data);
                }
                res.send(result);
            }
        }else{
            res.status(400).send("Data tidak boleh kosong");
        }
    } catch (error) {
        res.send(error)
    }
   
})


app.post("/route/post", (req, res) => {
    // res.send("Ini Post")
    const data = [
        {nama : "Bill gates"},
        {nama : "Steve jobs"},
        {nama:  "Mark zuckerberg"},
        {nama: "Warren Buffet"},
    ]
    let body =  req.body;
    console.log(body)
    if(body){
        data.push(body)
        res.status(200).send(data)
    }else{
        res.status(400).send("Data tidak boleh kosong");
    }
})

app.put("/route/put/:ID", (req, res) => {
    const dataSource = [
        {ID: 1, nama : "Bill gates"},
        {ID: 2, nama : "Steve jobs"},
        {ID: 3, nama:  "Mark zuckerberg"},
        {ID: 4, nama: "Warren Buffet"},
    ]
    try {
        let paramID = req.params.ID;
        let newData = req.body;
        if(paramID){
            dataSource.find((data, index) => {
                if(data.ID == paramID){
                    let format = {
                        ID : Number(paramID),
                        nama:  newData?.nama
                    }
                    dataSource[index] = format;
                    res.send(dataSource);
                }else{
                    new Error(`Data dengan ID ${paramID} tidak ditemukan`)
                }
            })
           
        }else{
            new Error("Data tidak boleh kosong")
        }
    } catch (error) {
        res.send(error)
    }
})

app.patch("/route/patch", (req, res) => {
    res.send("Ini Patch")
})

app.delete("/route/delete/:IDS", (req, res) => {
    // delete action

    const dataSource = [
        {ID: 1, nama : "Bill gates"},
        {ID: 2, nama : "Steve jobs"},
        {ID: 3, nama:  "Mark zuckerberg"},
        {ID: 4, nama: "Warren Buffet"},
    ]
    let ID =  req?.params?.IDS;
    try {
        let filter = dataSource.filter((data) => data.ID != ID);
        let format ={
            dataLama : dataSource,
            dataBaru : filter
        }
        res.send(format);
    } catch (error) {
        res.send(error)
    }
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})