const fileUrl = require("file-url");
const isUrl = require("is-url");
const parseUrl = require("url-parse");
const puppeteer = require("puppeteer");
const {
  buildLaunchOptions,
  buildNavigationOptions,
  screenshotBuilder,
} = require("./puppeteer.constants");

// Abstracted to make testing easier
takeScreenshot = (url = null, filename = null) => {
  return new Promise(async (resolve, reject) => {
    if (!url && !filename) {
      reject("Parameters are missing");
      return;
    }

    // store output into base64 and send to analysis server
    const argv = {
      ...screenshotBuilder,
      url: url,
      output: filename,
    };

    const browser = await puppeteer.launch(buildLaunchOptions(argv));
    screenshotPage(argv, await browser.newPage())
      .then((buffer) => {
        // console.log("Completed screenshot operation!");
        browser.close();
        resolve(buffer);
      })
      .catch((err) => {
        console.error({ err }, "something happened!");
        browser.close();
        reject("Something went wrong!");
      });
  });
};

screenshotPage = async (argv, page) => {
  return new Promise(async (resolve, reject) => {
    const url = isUrl(argv.url)
      ? parseUrl(argv.url).toString()
      : fileUrl(argv.url);

    const options = {
      encoding: "base64",
      fullPage: argv.fullPage,
      omitBackground: argv.omitBackground,
      path: `data/${argv.output}.png`,
    };

    // console.log(`Loading ${url} and writing to ${options.path}...`);

    await page.goto(url, buildNavigationOptions(argv));
    page
      .screenshot(options)
      .then((buffer) => resolve(buffer))
      .catch((err) => reject(err));
  });
};

// Grabs URL or HTML file contents
grabHtmlContent = async (argv, page) => {
  return new Promise(async (resolve, reject) => {
    // Checks if given link is a file or URL
    const url = isUrl(argv.url)
      ? parseUrl(argv.url).toString()
      : fileUrl(argv.url);

    console.log(`Loading ${url}`);
    await page.goto(url, buildNavigationOptions(argv));
    // await page.waitForSelector("#readyToPrint");
    page
      .evaluate(() => document.documentElement.outerHTML)
      .then((html) => resolve(html))
      .catch((err) => reject(err));
  });
};

printPage = async (argv, page) => {
  return new Promise(async (resolve, reject) => {
    const url = isUrl(argv.url)
      ? parseUrl(argv.url).toString()
      : fileUrl(argv.url);

    const options = {
      path: `${argv.output}.pdf`,
      format: argv.format,
      landscape: argv.landscape,
      printBackground: argv.background,
      margin: {
        top: argv["margin-top"],
        right: argv["margin-right"],
        bottom: argv["margin-bottom"],
        left: argv["margin-left"],
      },
      displayHeaderFooter: argv["display-header-footer"],
      headerTemplate: argv["header-template"],
      footerTemplate: argv["footer-template"],
    };

    console.log(`Loading ${url} and writing to ${options.path}...`);

    await page.goto(url, buildNavigationOptions(argv));
    page
      .pdf(options)
      .then(() => resolve())
      .catch((err) => reject(err));
  });
};

module.exports = { takeScreenshot };
