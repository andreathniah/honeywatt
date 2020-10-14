const postToServer = (data) => {
  return new Promise((resolve, reject) => {
    const { tabId, tabUrl } = data;

    // TODO: Add excluded sites into a database
    if (tabUrl === "https://www.google.com/") resolve(false);

    const url = "http://localhost:5000/api";
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({ url: tabUrl, id: tabId }),
    })
      .then((response) =>
        response.status === 200 ? resolve(true) : reject(false)
      )
      .catch((err) => reject(err));
  });
};

export { postToServer };
