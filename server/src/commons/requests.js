const axios = require("axios");

class Requests {
  constructor() {}

  // TODO: to write unit test
  // TODO: check if user has the right to post
  // receiving server should authenticate to ensure request is from
  postToTarget(url = null, data = null) {
    return new Promise((resolve, reject) => {
      if (!url && !data)
        reject({ status: false, message: "Missing parameters" });

      const postOptions = { method: "post", url: url, data: data };
      axios(postOptions)
        .then((response) => {
          console.log("[REQUEST] Got result from axios");
          resolve(response);
        })
        .catch((err) => reject({ status: false, message: err }));
    });
  }
}

module.exports = Requests;
