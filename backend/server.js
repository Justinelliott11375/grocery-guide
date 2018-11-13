const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const List = require("./models/list");
const Item = require("./models/item");
const API_PORT = 3001;
const app = express();
const router = express.Router();

// mongoDB
const dbRoute = "mongodb://grocery-user-1:password1@ds161183.mlab.com:61183/grocery-guide";

// connect backend with database
mongoose.connect(
  dbRoute,
  { useNewUrlParser: true }
);
let database = mongoose.connection;
database.once("open", () => console.log("connected to database"));

// checks for successful connection with database
database.on("error", console.error.bind(console, "MongoDB connection error:"));


// body-parser, parses body into json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// get, GETs all lists from database
router.get("/getAllLists", (req, res) => {
  List.find((err, list) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, list: list });
  });
});

// update, changes existing data in database
router.post("/updateList", (req, res) => {
  const { id, update } = req.body;
  List.findOneAndUpdate(id, update, err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});


// deletes existing data in database
router.delete("/deleteList", (req, res) => {
  const { id } = req.body;
  List.findOneAndDelete(id, err => {
    if (err) return res.send(err);
    return res.json({ success: true });
  });
});


// create, adds new list to database
router.post("/addList", (req, res) => {
  let list = new List();

  const { id, title } = req.body;

  if ((!id && id !== 0) || !title) {
    return res.json({
      success: false,
      error: "Invalid input"
    });
  }
  list.title = title;
  list.id = id;
  list.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

// get, GETs all list items from database
router.get("/getAllListItems", (req, res) => {
    Item.find((err, listItems) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, listItems: listItems});
    });
  });

// create, adds new item to database
router.post("/addListItem", (req, res) => {
    let item = new Item();
  
    const { id, title, listId } = req.body;
  
    if ((!id && id !== 0) || !title) {
      return res.json({
        success: false,
        error: "Invalid input"
      });
    }
    item.title = title;
    item.id = id;
    item.listId = listId;
    item.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  });

// append /api for http requests
app.use("/api", router);

// start backend server in specified port
app.listen(API_PORT, () => console.log(`server is listening on port ${API_PORT}`));