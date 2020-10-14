const express = require("express");
const bodyParser = require("body-parser");
const Shark = require("./models/sharks");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// POST request to start scraping
app.post("/api", (req, res) => {
  console.log(req.body);
  const { url, id } = req.body;
  console.log(`Tab ${id} requested for ${url}`);

  res.send(200);
});

app.post("/create", (req, res) => {
  var newShark = new Shark(req.body);
  newShark.save(function (err) {
    if (err) res.status(400).send("Unable to save shark to database");
    else console.log("Shark successfully saved!");
  });
});

app.post("/list", (req, res) => {
  Shark.find({}).exec((err, sharks) => {
    if (err) return res.send(500, err);
    console.log(sharks);
    res.render("getshark", { sharks: sharks });
  });
});
