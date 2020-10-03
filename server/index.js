const express = require("express");
const bodyParser = require("body-parser");

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

  res.send();
});
