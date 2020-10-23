const chai = require("chai");
const expect = chai.expect;
const should = chai.should();

const { fileToBase64 } = require("../src/commons/helpers");
const Analyse = require("../src/controllers/analyse");

require("./puppeteer"); // ensure puppeteer is tested first

/*
 *     isGloballyMalicious()
 */
describe("[UNIT] isGloballyMalicious()", async () => {
  beforeEach((done) => {
    ssInBase64 = fileToBase64("data/output.png");
    done();
  });

  describe("url=null, screenshot=null", () => {
    it("should return null if parameters are missing", (done) => {
      const analyse = new Analyse();
      const result = analyse.isGloballyMalicious();
      expect(result).to.equal(null);
      done();
    });
  });

  // pre-defined phish
  describe("url=malicious.site, screenshot=string", () => {
    it("should return true if url is globally_malicious", (done) => {
      const analyse = new Analyse("malicious.site", ssInBase64);
      const result = analyse.isGloballyMalicious();
      expect(result).to.equal(true);
      done();
    });
  });

  describe("url=random.site, screenshot=string", () => {
    it("should return false if url is not globally_malicious", (done) => {
      const analyse = new Analyse("random.site", ssInBase64);
      const result = analyse.isGloballyMalicious();
      expect(result).to.equal(false);
      done();
    });
  });
});

/*
 *     isCompanyWhitelisted()
 */
describe("[UNIT] isCompanyWhitelisted()", () => {
  beforeEach((done) => {
    ssInBase64 = fileToBase64("data/output.png");
    done();
  });

  describe("url=null, screenshot=null", () => {
    it("should return null if parameters are missing", (done) => {
      const analyse = new Analyse();
      const result = analyse.isCompanyWhitelisted();
      expect(result).to.equal(null);
      done();
    });
  });

  // requested ignore
  describe("url=whitelisted.site, screenshot=string", () => {
    it("should return true if url is company_whitelisted", (done) => {
      const analyse = new Analyse("whitelisted.site", ssInBase64);
      const result = analyse.isCompanyWhitelisted();
      expect(result).to.equal(true);
      done();
    });
  });

  // requested ignore
  describe("url=random.site, screenshot=string", () => {
    it("should return false if url is not company_whitelisted", (done) => {
      const analyse = new Analyse("whitelisted.site", ssInBase64);
      const result = analyse.isCompanyWhitelisted();
      expect(result).to.equal(false);
      done();
    });
  });
});

/*
 *     isPhish()
 */
describe("[INTEGRATION] isPhish()", () => {
  beforeEach((done) => {
    ssInBase64 = fileToBase64("data/output.png");
    done();
  });

  describe("url=whitelisted.site, screenshot=string", () => {
    it("should return false if url is pre-defined whitelisted", (done) => {
      const analyse = new Analyse("whitelisted.site", ssInBase64);
      const result = analyse.isPhish();
      expect(result).to.equal(false);
      done();
    });
  });

  describe("url=malicious.site, screenshot=string", () => {
    it("should return false if url is pre-defined malicious", (done) => {
      const analyse = new Analyse("malicious.site", ssInBase64);
      const result = analyse.isPhish();
      expect(result).to.equal(true);
      done();
    });
  });

  //   describe("url=gOOOgle.site, screenshot=string", () => {
  //     it("should return true if analysis server returns google.com", (done) => {
  //       const analyse = new Analyse("gOOOgle.site", ssInBase64);
  //       const result = analyse.isPhish();
  //       expect(result).to.equal(true);
  //       done();
  //     });
  //   });

  //   describe("url=normal.site, screenshot=string", () => {
  //     it("should return false if analysis server returns unrecognised", (done) => {
  //       const analyse = new Analyse("normal.site", ssInBase64);
  //       const result = analyse.isPhish();
  //       expect(result).to.equal(false);
  //       done();
  //     });
  //   });
});
