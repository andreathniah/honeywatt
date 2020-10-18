require("./db");
const express = require("express");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

// Testing APIs for MongoDB
const Item = require("./models/item");
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

// POST request to start scraping
app.post("/api", (req, res) => {
  console.log(req.body);
  const { url, id } = req.body;
  console.log(`Tab ${id} requested for ${url}`);

  res.status(200).json({ msg: "Successfully pinged!" });
});
