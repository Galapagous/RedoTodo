const express = require("express")
const mongoose = require("mongoose")
const App = express()
const TodoApi = require("./Routes/Todo")
const cors = require("cors")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")

App.use(cors())
App.use(express.json())
dotenv.config()

mongoose
  .connect(process.env.MONGODB_URI || process.env.SHELL_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(`error connecting to data base`)
  })

App.get("/", (req, res) => {
  res.send("Hello from galapagous")
})
App.use("/api", TodoApi)

if (process.env.NODE_ENV === "production") {
  App.use(express.static("client/build"))
}

App.listen(process.env.PORT, () => {
  console.log("App is listening on port 4000")
})
