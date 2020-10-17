const { takeScreenshot } = require("./controllers/puppeteer");

analyseURL = (req, res) => {
  const taskId = req.params.taskId;
  const { url, identity } = req.body;

  console.log(`[${identity}] Tab ${taskId} accessing ${url}`);

  // TODO: Authentication to check which company this user is from via keys

  // TODO: Take screenshot and convert buffer to base64
  // const ssInBinary = await puppeteer.takeScreenshot(url, filename);
  // const ssInBase64 = Buffer.from(ssInBinary, "binary").toString("base64");

  // TODO: Call Analyse class to analyse if image is phishing site

  res.status(200).json({ message: "WIP!" });
};

// NOTE: Only for testing purposes
getScreenshot = (req, res) => {
  const url = "https://www.browserless.io/";
  const filepath = "data/";
  takeScreenshot(url, filepath)
    .then((buffer) => res.status(200).json({ message: buffer }))
    .catch((err) => res.status(501).json(err));
};

module.exports = { getScreenshot, analyseURL };
