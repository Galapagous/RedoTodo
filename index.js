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
  .connect(process.env.MONGO_URLU || process.env.SHELL_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(`error connecting to database${err}`)
  })

App.get("/", (req, res) => {
  res.send("Hello from galapagous")
})
App.use("/api", TodoApi)

// App.use(express.static(path.join(__dirname, "/client")))
// App.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/client/build", "index.js"))
// })

let port = process.env.PORT
if (port == null || port == "") {
  port = process.env.MY_PORT
}
App.listen(process.env.PORT, () => {
  console.log(`App is listening on port ${port}`)
})
