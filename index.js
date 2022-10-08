const express = require("express")
const mongoose = require("mongoose")
const App = express()
const TodoApi = require("./Routes/Todo")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const path = require("path")

App.use(cors())
App.use(express.json())
dotenv.config()

mongoose
  .connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(`error connecting to database:${err}`)
  })

App.use("/api", TodoApi)

// ------------------------------Deployment------------------------------------
App.use(express.static(path.join(__dirname, "/client")))
App.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})
// ------------------------------Deployment------------------------------------

App.listen(process.env.PORT || 4000, () => {
  console.log(`App is listening on ${PORT}`)
})
