const fs = require("fs");
const assert = require("assert");
const puppeteer = require("../src/controllers/puppeteer");

describe("Testing Puppeteer's screenshot", () => {
  //Before each test we empty the data
  beforeEach((done) => {
    fs.access("data/output.png", fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlinkSync("data/output.png");
        done();
      }
    });
  });

  describe("Create screenshot", () => {
    it("should create output.png", (done) => {
      puppeteer
        .takeScreenshot("https://www.browserless.io/", "data/output")
        .then(() => {
          const stats = fs.statSync("data/output.png");
          assert.strictEqual(stats.isFile(), true);
          done();
        });
    });
  });
});
