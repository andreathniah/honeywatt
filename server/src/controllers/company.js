const Company = require("../models/company");

const CompanyController = {
  findOne: (obj) => {
    return new Promise((resolve, reject) => {
      Company.findOne(obj, async (err, company) => {
        console.log("company", company);

        if (err) reject(err);
        else if (company) resolve(company);
        else resolve(null);
      });
    });
  },
};

module.exports = CompanyController;
