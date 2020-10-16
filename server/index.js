const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const {
  buildLaunchOptions,
  screenshotBuilder,
} = require("./services/puppeteerOptions");
const { screenshotPage } = require("./controllers/puppeteer");

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Check alive status
app.get("/", (req, res) => {
  res.status(200).json({ msg: "ok!" });
});

app.post("/screenshot", async (req, res) => {
  console.log(req.body);

  // store output into base64 and send to analysis server
  const argv = {
    ...screenshotBuilder,
    url: "https://www.browserless.io/",
    output: "output",
  };

  const browser = await puppeteer.launch(buildLaunchOptions(argv));
  screenshotPage(argv, await browser.newPage())
    .then((buffer) => {
      console.log("Completed screenshot operation!");
      browser.close();
      res.status(200).json({ buffer: buffer });
    })
    .catch((err) => {
      console.error({ err }, "something happened!");
      browser.close();
      res.status(501);
    });
});

// POST request to start scraping
app.post("/api", (req, res) => {
  console.log(req.body);
  const { url, id } = req.body;
  console.log(`Tab ${id} requested for ${url}`);
  res.send();
});
