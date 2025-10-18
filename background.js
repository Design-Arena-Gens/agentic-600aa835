// Background service worker for MailMind AI

console.log('MailMind AI: Background service worker initialized');

// Listen for installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('MailMind AI: Extension installed');

    // Set default settings
    chrome.storage.sync.set({
      autoSync: true,
      notifications: true,
      autoDetect: true
    });
  }
});

// Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('MailMind AI: Message received', request);

  if (request.type === 'NEW_EMAIL_DETECTED') {
    // Handle new email detection
    chrome.storage.local.get(['detectedEmails'], (result) => {
      const emails = result.detectedEmails || [];
      emails.push({
        timestamp: Date.now(),
        count: request.count
      });
      chrome.storage.local.set({ detectedEmails: emails });
    });

    // Update badge
    chrome.action.setBadgeText({ text: String(request.count) });
    chrome.action.setBadgeBackgroundColor({ color: '#4A90E2' });
  }

  if (request.type === 'ADD_TO_CALENDAR') {
    // Handle calendar addition
    console.log('Adding to calendar:', request.event);
  }

  sendResponse({ success: true });
  return true;
});

// Clear badge when popup is opened
chrome.action.onClicked.addListener(() => {
  chrome.action.setBadgeText({ text: '' });
});

// Periodic check for new emails (optional)
chrome.alarms.create('checkEmails', { periodInMinutes: 5 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'checkEmails') {
    console.log('MailMind AI: Checking for new emails...');
    // This would trigger content script to re-scan
  }
});
