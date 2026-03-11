// Background service worker for FocusDock
chrome.runtime.onInstalled.addListener(() => {
  console.log("FocusDock installed successfully");
});

// Handle timer completion notifications
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "TIMER_COMPLETE") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon128.png",
      title: "Focus Session Completed! 🎉",
      message: "Great work! Time for a break.",
      priority: 2,
    });
  }

  // Handle always on top request
  if (request.type === "TOGGLE_ALWAYS_ON_TOP") {
    if (sender.tab) {
      chrome.windows.update(sender.tab.windowId, {
        focused: true,
        drawAttention: true,
      });
    }
  }
});

// Create a persistent window for always-on-top functionality
let persistentWindowId = null;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "CREATE_PERSISTENT_WINDOW") {
    if (persistentWindowId) {
      chrome.windows.remove(persistentWindowId);
    }

    chrome.windows.create(
      {
        url: chrome.runtime.getURL("index.html"),
        type: "popup",
        width: 400,
        height: 600,
        top: 50,
        left: 50,
        focused: true,
      },
      (window) => {
        persistentWindowId = window.id;
        sendResponse({ success: true, windowId: window.id });
      },
    );

    return true;
  }
});
