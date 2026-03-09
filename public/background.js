// Background service worker for FocusDock
chrome.runtime.onInstalled.addListener(() => {
  console.log('FocusDock installed successfully');
});

// Handle timer completion notifications
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TIMER_COMPLETE') {
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'icon128.png',
      title: 'Focus Session Completed! 🎉',
      message: 'Great work! Time for a break.',
      priority: 2
    });
  }
});
