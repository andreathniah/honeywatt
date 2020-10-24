const { takeScreenshot } = require("./controllers/puppeteer");
const { deleteSeedData, insertSeedData } = require("./commons/seeder");

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
  const filename = "output";
  console.log("[ROUTES] Getting screenshots from:", url);
  takeScreenshot(url, filename)
    .then((buffer) => res.status(200).json({ message: buffer }))
    .catch((err) => res.status(501).json(err));
};

seedDatabase = (req, res) => {
  const companyname = "grabwatt";
  insertSeedData(companyname)
    .then(() => res.status(200))
    .catch((err) => {
      deleteSeedData().then(() => res.status(501).json(err));
    });
};

deleteDatabase = (req, res) => {
  const companyname = "grabwatt";
  deleteSeedData(companyname)
    .then(() => res.status(200))
    .catch((err) => res.status(501).json(err));
};

module.exports = { getScreenshot, analyseURL, seedDatabase, deleteDatabase };
