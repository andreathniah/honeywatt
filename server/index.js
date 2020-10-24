require("./src/db");
require("dotenv").config();

const express = require("express");
const router = require("./src/routes");

const app = express();
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// Testing APIs for MongoDB
const Item = require("./src/models/item");
app.get("/", (req, res) => {
  Item.find()
    .then((items) => res.render("index", { items: items }))
    .catch((err) => res.status(404).json({ msg: "No items found" }));
});

app.post("/item/add", (req, res) => {
  const newItem = new Item({ name: req.body.name });
  newItem.save().then((item) => {
    console.log("Added item", item);
    res.redirect("/");
  });
});

// For testing purposes
app.route("/screenshot/:id").post(router.getScreenshot);
app
  .route("database/seed")
  .post(router.seedDatabase)
  .delete(router.deleteDatabase);

// Check alive status
app.get("/status", (req, res) => res.status(200).json({ msg: "ok!" }));
app.route("/analyse/:taskId").post(router.analyseURL);

module.exports = app; // for testing
