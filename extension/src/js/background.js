import { postToServer } from "./modules/helpers.js";

console.log("[BACKGROUND] Background is ready and running!");

// When tab is switched
chrome.tabs.onActivated.addListener(({ tabId: activeTab }) => {
  console.log("switching tabs", activeTab);

  const message = { opcode: "phish_get_url", tabId: activeTab };
  sendMessagePromise(activeTab, message).then(async (response) => {
    if (response) {
      const result = await postToServer(response);
      if (result) await executeScriptPromise(activeTab);
    }
  });
});

// When tab is updated (i.e. new link)
chrome.tabs.onUpdated.addListener((activeTab) => {
  console.log("updating tabs", activeTab);

  const message = { opcode: "phish_get_url", tabId: activeTab };
  sendMessagePromise(activeTab, message).then(async (response) => {
    if (response) {
      const result = await postToServer(response);
      if (result) await executeScriptPromise(activeTab);
    }
  });
  executeScriptPromise(activeTab);
});

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   console.log("url", request.tabUrl);
// });

const sendMessagePromise = (activeTab, message) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(activeTab, message, (response) =>
      resolve(response)
    );
  });
};

const executeScriptPromise = (activeTab) => {
  return new Promise((resolve, reject) => {
    chrome.tabs.executeScript(
      activeTab,
      { file: "src/js/modules/inject.js" },
      (response) => resolve(response)
    );
  });
};
