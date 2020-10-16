const express = require("express");
const bodyParser = require("body-parser");
const router = require("./src/routes");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// For testing purposes
app.route("/screenshot/:id").post(router.getScreenshot);

// Check alive status
app.get("/", (req, res) => res.status(200).json({ msg: "ok!" }));
app.route("/analyse/:taskId").post(router.analyseURL);

module.exports = app; // for testing
