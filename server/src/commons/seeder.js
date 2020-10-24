const Company = require("../models/company");
const User = require("../models/user");
const Phish = require("../models/phish");

insertSeedData = (companyName = null) => {
  return new Promise(async (resolve, reject) => {
    if (companyName == null) {
      reject("Missing parameters");
      return;
    }

    const hostName = `${companyName}.com`;
    const dummyUser = `user1@${hostName}`;

    // dummy values for new models
    const newUser = new User({ email: dummyUser });
    const newCompany = new Company({
      name: companyName,
      hostname: hostName,
      whitelist: ["google.com"],
    });
    const newPhish = new Phish({
      href: "http://somesuspicious.site/weird/path.html",
      hostname: "somesuspicious.site",
      ip_address: "10.10.10.10.",
    });

    // add basecase company
    await newCompany
      .save()
      .then((company) => console.log("New company added!", company.name))
      .catch((err) => reject(err));

    // add new user with company as foreign key in parent parameter
    await newUser
      .save()
      .then((user) => {
        Company.findOne({ name: companyName }, (err, company) => {
          if (err) reject(err);
          newUser.parent = company;
          newUser.save();

          console.log("New user added!", user.email);
        });
      })
      .catch((err) => reject(err));

    // add new phish
    await newPhish
      .save()
      .then((phish) => {
        // update company to set phish as foregin key in malicious parameter
        newCompany.malicious.push(newPhish);
        newCompany.save();

        User.findOne({ email: dummyUser }, (err, user) => {
          if (err) reject(err);
          else if (user) {
            // update phish to set user as foreign key in submitted_by parameter
            newPhish.submitted_by.push(user);
            newPhish.save();

            // update user to set phish as foreign key in phish parameter
            newUser.phish.push(phish);
            newUser.save();

            console.log("new phish added!", phish.href);
          }
        });
      })
      .catch((err) => reject(err));

    resolve();
  });
};

deleteSeedData = (companyName = null) => {
  return new Promise((resolve, reject) => {
    if (companyName == null) {
      reject("Missing parameters");
      return;
    }
    const hostName = `${companyName}.com`;
    const dummyUser = `user1@${hostName}`;

    User.findOne({ email: dummyUser }, async (err, user) => {
      if (!err && user) {
        try {
          user.phish.forEach(
            async (userId) => await Phish.findByIdAndDelete(userId)
          );
          await User.findOneAndDelete({ email: dummyUser });
          await Company.findOneAndDelete({ name: companyName });
          resolve();
        } catch {
          reject();
        }
      }
    });
  });
};

module.exports = { deleteSeedData, insertSeedData };
