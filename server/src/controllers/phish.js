const Phish = require("../models/phish");

const PhishController = {
  findOne: (obj) => {
    return new Promise((resolve, reject) => {
      Phish.findOne(obj, async (err, phish) => {
        console.log("phish", phish);

        if (err) reject(err);
        else if (phish) resolve(phish);
        else resolve(null);
      });
    });
  },
};

module.exports = PhishController;
