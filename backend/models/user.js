const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// database entry structure 
const userSchema = new Schema(
  {
    id: String,
    username: String,
    password: String
  },
  { timestamps: true }
);

// export Schema so it can be modified with Node
module.exports = mongoose.model("User", userSchema);