class Analyse {
  constructor(url = null, screenshot = null) {
    this.url = url;
    this.hostname = url; // TODO: convert URL to hostname
    this.screenshot = screenshot; // should already be in base64
  }

  isGloballyMalicious() {
    const status = null;
    if (this.hostname && this.screenshot) {
    }
    return status;
  }

  isCompanyWhitelisted() {
    const status = null;
    if (this.hostname && this.screenshot) {
    }
    return status;
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

  isPhish() {
    return new Promise(async (resolve, reject) => {
      // Check against pre-defined list
      if (this.isCompanyWhitelisted) resolve(false); // requested ignore
      if (this.isGloballyMalicious) resolve(true); // pre-defined phish

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
