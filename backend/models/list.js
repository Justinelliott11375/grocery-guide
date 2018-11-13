const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database entry structure 
const listSchema = new Schema(
  {
    id: Number,
    title: String
  },
  { timestamps: true }
);

// export Schema so it can be modified with Node
module.exports = mongoose.model("List", listSchema);