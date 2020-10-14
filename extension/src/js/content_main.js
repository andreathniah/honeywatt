export function main() {
  console.log(
    "Is chrome.runtime available here?",
    typeof chrome.runtime.sendMessage == "function"
  );
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const { opcode, tabId } = request;
  if (opcode === "phish_get_url") {
    sendResponse({
      opcode: "phish_send_url",
      tabId: tabId,
      tabUrl: window.location.href,
    });
  }
  return true;
});
