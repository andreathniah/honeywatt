// common options for both print and screenshots
const commonOptions = {
  sandbox: { headless: true, args: [] },
  timeout: 30 * 1000,
  waitUntil: "networkidle0",
};

// Prettifies PDF, works for ReactJS
const pdfBuilder = {
  ...commonOptions,
  "display-header-footer": false,
  "footer-template": "",
  "header-template": "",
  "margin-bottom": "14.11mm",
  "margin-left": "6.25mm",
  "margin-right": "6.25mm",
  "margin-top": "6.25mm",
  background: true,
  format: "Letter",
  landscape: false,
};

const screenshotBuilder = {
  ...commonOptions,
  "full-page": true,
  "omit-background": false,
  viewport: "800×600",
};

buildLaunchOptions = ({ sandbox }) => {
  const args = [];

  if (process.env.NODE_ENV !== "test") args.push("--no-sandbox"); // required for Docker
  if (sandbox === false) args.push("--disable-dev-shm-usage"); // required if not headless

  return { ...sandbox, args };
};

buildNavigationOptions = ({ timeout, waitUntil }) => {
  return { timeout, waitUntil };
};

module.exports = {
  buildLaunchOptions,
  buildNavigationOptions,
  commonOptions,
  pdfBuilder,
  screenshotBuilder,
};
