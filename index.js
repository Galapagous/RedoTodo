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
  .connect(process.env.MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(console.log("connected to DB"))
  .catch((err) => {
    console.log(`error connecting to database:${err}`)
  })

App.use("/api", TodoApi)

// ------------------------------Deployment------------------------------------
// const __dirname1 = path.resolve()
// if (process.env.NODE_ENV === "production") {
App.use(express.static(path.join(__dirname, "client/build")))
App.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})
// } else {
//   App.get("/", (req, res) => {
//     res.send("Hello from galapagous")
//   })
// }
// ------------------------------Deployment------------------------------------

let port = process.env.PORT
if (port == null || port == "") {
  port = process.env.MY_PORT
}
App.listen(port, () => {
  console.log(`App is listening on port 4000`)
})
