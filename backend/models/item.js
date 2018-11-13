const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database entry structure 
const itemSchema = new Schema(
  {
    id: Number,
    title: String,
    listId: Number
  },
  { timestamps: true }
);

// export Schema so it can be modified with Node
module.exports = mongoose.model("Item", itemSchema);