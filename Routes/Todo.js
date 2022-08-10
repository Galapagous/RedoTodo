const express = require("express")
const Todo = require("../Model/Todo")
const router = express.Router()

// Fetch todo
router.get("/todo", async (req, res) => {
  try {
    const data = await Todo.find()
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})

// Create a new todo
router.post("/new", async (req, res) => {
  if (req.body.heading && req.body.description) {
    try {
      const data = new Todo({
        heading: req.body.heading,
        description: req.body.description,
      })
      const newTodo = await data.save()
      res.status(200).json(newTodo)
    } catch (err) {
      res.status(500).json(err)
    }
  } else {
    res.status(400).json("Kindly pyovide the neccessary details")
  }
})

// Updating a todo
router.put("/update/:id", async (req, res) => {
  // console.log(req.params.id)
  try {
    const data = await Todo.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})
// Complete/Incomplete a todo
router.put("/complete/:id", async (req, res) => {
  try {
    const item = await Todo.findById(req.params.id)
    item.isComplete = !item.isComplete
    await item.save()
    res.status(200).json(item)
  } catch (err) {
    res.status(500).json(err)
  }
})
// Delte Todo
router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await Todo.findByIdAndRemove(req.params.id)
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err)
  }
})
module.exports = router
