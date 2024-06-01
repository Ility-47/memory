/* ебанистика с базой данных */

const express = require("express")
//const mongoose = require("mongoose")

const app = express()

//mongoose.connect("mongodb+srv://ilitya2three0:jPXm06An0V9QrXO0@cluster0.8wauhsx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

//app.use("/api", require("./api"))
app.get("/api", (req, res) =>{
  res.send({zalupa: "дай писюн"})
})

app.listen(4000, () => {
  console.log("сервер хуервер, вроде все в ажуре")
})