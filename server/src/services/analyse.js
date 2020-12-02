const phish = require("../controllers/phish");
const company = require("../controllers/company");

class Analyse {
  constructor(url = null, screenshot = null) {
    this.url = url;
    // this.hostname = url; // TODO: convert URL to hostname
    this.hostname = "google.com";
    this.screenshot = screenshot; // should already be in base64
  }

  isGloballyMalicious() {
    return new Promise((resolve, reject) => {
      if (this.hostname && this.screenshot) {
        phish
          .findOne({ hostname: this.hostname })
          .then((status) => (status ? resolve(true) : resolve(false)))
          .catch(() => resolve(false));
      } else resolve(null);
    });
  }

  isCompanyWhitelisted() {
    return new Promise((resolve, reject) => {
      if (this.hostname && this.screenshot) {
        company
          .findOne({ whitelist: this.hostname })
          .then((status) => (status ? resolve(true) : resolve(false)))
          .catch(() => resolve(false));
      } else resolve(null);
    });
  }

  // TODO: Spin API key after GSuite account is available
  isSafeBrowsingApproved() {
    return new Promise((resolve, reject) => {
      const status = null;
      if (this.url) {
      }
      return resolve(status);
    });
  }

  // TODO: consider writing result to somewhere for analytical purposes
  updateSafetiesLog(isPhish) {
    const isSafeByGoogle = this.isSafeBrowsingApproved();
    const result = {
      url: this.url,
      hostname: this.hostname,
      isSafeByPhish: isPhish,
      isSafeByGoogle: isSafeByGoogle,
    };
  }

  // TODO: Delete after testing
  forTesting() {
    return new Promise(async (resolve, reject) => {
      console.log("URL:", this.url);
      console.log("HOSTNAME:", this.hostname);
      this.isCompanyWhitelisted()
        .then((status) => console.log("company is whitelisted:", status))
        .catch((err) => console.log(err));

      this.isGloballyMalicious()
        .then((status) => console.log("link is malicious:", status))
        .catch((err) => console.log(err));

      resolve();
    });
  }

  isPhish() {
    return new Promise(async (resolve, reject) => {
      // Check against pre-defined list
      if (await this.isCompanyWhitelisted) resolve(false); // requested ignore
      if (await this.isGloballyMalicious) resolve(true); // pre-defined phish

      // SafeBrowsing to anaylse rate of false +ve/-ve
      const isSafeBrowsingApproved = await this.isSafeBrowsingApproved();

      // TODO: Do a post request to analysis server

      // Assuming that this is the result of analysis server
      const analysisResult = {
        status: "identified",
        source: "google.com",
        percentageOfConfidence: 80,
      };

      if (analysisResult.status === "identified") {
        // result (google.com) === hostname (google.com) -- not phish
        if (analysisResult.source === this.hostname) resolve(false);
        // result (google.com) !== hostname (gOOOgle.com) -- is phish
        // provided that the PoC is > 50
        else if (analysisResult.percentageOfConfidence > 50) {
          // TODO: update database's company_malicious and global_malicious
          resolve(true);
        }

        // PoC is not high, let Google determine if its safe
        else resolve(isSafeBrowsingApproved);
      } else if (analysisResult.status === "unknown") {
        // Site determined as safe, let Google double check, just in case
        if (isSafeBrowsingApproved) resolve(false);
        else resolve(true);
      }
    });
  }
}

module.exports = Analyse;
