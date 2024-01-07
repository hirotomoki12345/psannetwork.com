// background.js

let userId;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "getUserId") {
    sendResponse({ userId });
  } else if (request.message === "setUserId") {
    userId = request.userId;
    sendResponse({ success: true });
  } else if (request.message === "sendLocationRequest") {
    // rest of the code for sending location request
  }
});
