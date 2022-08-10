const express = require("express")
const mongoose = require("mongoose")
const App = express()
const TodoApi = require("./Routes/Todo")
const cors = require("cors")
const bodyParser = require("body-parser")

App.use(cors())
App.use(express.json())

mongoose
  .connect("mongodb://127.0.0.1:27017/W3Todo", { useUnifiedTopology: true, useNewUrlParser: true })
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(err)
  })

App.get("/", (req, res) => {
  res.send("Hello from galapagous")
})
App.use("/api", TodoApi)

App.listen(4000, () => {
  console.log("App is listening on port 4000")
})
