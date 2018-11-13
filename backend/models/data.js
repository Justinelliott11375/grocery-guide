const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database entry structure 
const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

// export Schema so it can be modified with Node
module.exports = mongoose.model("Data", DataSchema);