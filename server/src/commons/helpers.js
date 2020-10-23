const fs = require("fs").promises;

fileToBase64 = (filepath) => {
  new Promise((resolve, reject) => {
    fs.readFile(filepath, { encoding: "base64" })
      .then((buffer) => resolve(buffer))
      .catch((err) => reject(err));
  });
};

module.exports = { fileToBase64 };
