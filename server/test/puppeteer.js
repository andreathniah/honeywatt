const assert = require("assert");
const fs = require("fs");

const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const puppeteer = require("../src/controllers/puppeteer");

/*
 *     takeScreenshot(url, filename)
 */

describe("[UNIT] takeScreenshot(url, filename)", () => {
  describe("url=null, filename=null", () => {
    it("should return null", (done) => {
      puppeteer.takeScreenshot().catch((err) => {
        expect(err).to.equal("Parameters are missing");
        done();
      });
    });
  });

  describe("url=string, filename=null", () => {
    it("should return null", (done) => {
      puppeteer.takeScreenshot().catch((err) => {
        expect(err).to.equal("Parameters are missing");
        done();
      });
    });
  });

  describe("url=null, filename=string", () => {
    it("should return null", (done) => {
      puppeteer.takeScreenshot().catch((err) => {
        expect(err).to.equal("Parameters are missing");
        done();
      });
    });
  });
});

describe("[INTEGRATION] takeScreenshot(url, filename)", () => {
  //Before each test we empty the data
  beforeEach((done) => {
    fs.access("data/output.png", fs.constants.F_OK, (err) => {
      if (!err) {
        fs.unlinkSync("data/output.png");
        done();
      }
    });
  });

  describe("url=string, filename=string", () => {
    it("should create output.png", (done) => {
      puppeteer
        .takeScreenshot("https://www.browserless.io/", "output")
        .then(() => {
          const stats = fs.statSync("data/output.png");
          assert.strictEqual(stats.isFile(), true);
          done();
        });
    });
  });
});
