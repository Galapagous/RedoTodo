const mongoose = require("mongoose")

const Todo = new mongoose.Schema(
  {
    heading: {
      type: String,
      unique: true,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: { default: Date.now().toLocaleString() } }
)

const Todos = new mongoose.model("todo", Todo)

module.exports = Todos
