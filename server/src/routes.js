const { takeScreenshot } = require("./controllers/puppeteer");

analyseURL = (req, res) => {
  const taskId = req.params.taskId;
  const { url, identity } = req.body;

  console.log(`[${identity}] Tab ${taskId} accessing ${url}`);

  // TODO: Authentication to check which company this user is from via keys

  // TODO: Pre-checks against pre-defined lists
  // check if hostname is globally_malicious -- return true (pre-defined phish)
  // check if hostname is company_whitelisted -- return false (not phish)
  // check if hostname is company_blacklisted -- return true (requested ignore)

  // NOTE: SafeBrowsing is to help us minimise false positive/negative
  // if hostname passes/fails Google SafeBrowsing, take screenshot, send to analysis

  // TODO: Determine results
  // if hostname (google.com) == analysis result (google) -- return false (not phish)
  // if hostname (gooogle.com) != analysis result (google) -- return true (phish)

  res.status(200).json({ message: "WIP!" });
};

// NOTE: Only for testing purposes
getScreenshot = (req, res) => {
  takeScreenshot().then(({ status, message }) =>
    res.status(status).json({ message })
  );
};

module.exports = { getScreenshot, analyseURL };
