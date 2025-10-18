// Sample data for demonstration
const sampleSuggestions = [
  {
    id: 1,
    type: 'meeting',
    title: 'Team Standup Meeting',
    date: 'October 20, 2025',
    time: '3:00 PM',
    description: 'AI found a meeting on Oct 20, 3PM',
    from: 'sarah@company.com'
  },
  {
    id: 2,
    type: 'deadline',
    title: 'Project Submission Deadline',
    date: 'October 25, 2025',
    time: '5:00 PM',
    description: 'Deadline detected: Submit final report by Oct 25',
    from: 'manager@company.com'
  }
];

const sampleEmails = [
  {
    sender: 'Sarah Johnson',
    subject: 'Quick sync about Q4 planning',
    time: '2 hours ago',
    detectedDate: 'Oct 20, 3PM'
  },
  {
    sender: 'Project Manager',
    subject: 'Final report submission - Oct 25 deadline',
    time: '5 hours ago',
    detectedDate: 'Oct 25, 5PM'
  },
  {
    sender: 'HR Department',
    subject: 'Annual review meeting scheduled',
    time: '1 day ago',
    detectedDate: 'Oct 22, 10AM'
  }
];

const sampleReminders = [
  {
    title: 'Team Standup',
    time: 'Today at 3:00 PM'
  },
  {
    title: 'Client Presentation',
    time: 'Tomorrow at 11:00 AM'
  },
  {
    title: 'Project Deadline',
    time: 'Oct 25 at 5:00 PM'
  }
];

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  loadSuggestions();
  loadEmails();
  loadReminders();
  setupEventListeners();
  loadSettings();
});

function loadSuggestions() {
  const container = document.getElementById('suggestionsContainer');

  if (sampleSuggestions.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="#ccc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>No suggestions at the moment</p>
      </div>
    `;
    return;
  }

  container.innerHTML = sampleSuggestions.map(suggestion => `
    <div class="suggestion-card" data-id="${suggestion.id}">
      <div class="suggestion-header">
        <span class="ai-badge">✨ AI Detected</span>
      </div>
      <div class="suggestion-content">
        ${suggestion.description}
      </div>
      <div class="suggestion-details">
        <strong>${suggestion.title}</strong>
        📅 ${suggestion.date} at ${suggestion.time}
      </div>
      <div class="suggestion-actions">
        <button class="btn btn-primary" onclick="addToCalendar(${suggestion.id})">
          Add to Calendar
        </button>
        <button class="btn btn-secondary" onclick="dismissSuggestion(${suggestion.id})">
          Dismiss
        </button>
      </div>
    </div>
  `).join('');
}

function loadEmails() {
  const container = document.getElementById('emailsContainer');

  if (sampleEmails.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No recent emails with dates</p>
      </div>
    `;
    return;
  }

  container.innerHTML = sampleEmails.map(email => `
    <div class="email-item">
      <div class="email-header">
        <span class="email-sender">${email.sender}</span>
        <span class="email-time">${email.time}</span>
      </div>
      <div class="email-subject">${email.subject}</div>
      <span class="email-date-detected">
        📅 ${email.detectedDate}
      </span>
    </div>
  `).join('');
}

function loadReminders() {
  const container = document.getElementById('remindersContainer');

  if (sampleReminders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>No upcoming events</p>
      </div>
    `;
    return;
  }

  container.innerHTML = sampleReminders.map(reminder => `
    <div class="reminder-item">
      <div class="reminder-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="white" stroke-width="2"/>
          <path d="M16 2v4M8 2v4M3 10h18" stroke="white" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="reminder-content">
        <div class="reminder-title">${reminder.title}</div>
        <div class="reminder-time">${reminder.time}</div>
      </div>
    </div>
  `).join('');
}

function setupEventListeners() {
  const settingsBtn = document.getElementById('settingsBtn');
  const closeSettings = document.getElementById('closeSettings');
  const settingsPanel = document.getElementById('settingsPanel');
  const saveSettings = document.getElementById('saveSettings');

  settingsBtn.addEventListener('click', () => {
    settingsPanel.classList.add('active');
  });

  closeSettings.addEventListener('click', () => {
    settingsPanel.classList.remove('active');
  });

  saveSettings.addEventListener('click', () => {
    const autoSync = document.getElementById('autoSync').checked;
    const notifications = document.getElementById('notifications').checked;
    const autoDetect = document.getElementById('autoDetect').checked;

    chrome.storage.sync.set({
      autoSync,
      notifications,
      autoDetect
    }, () => {
      showNotification('Settings saved successfully!');
      settingsPanel.classList.remove('active');
    });
  });
}

function loadSettings() {
  chrome.storage.sync.get(['autoSync', 'notifications', 'autoDetect'], (result) => {
    document.getElementById('autoSync').checked = result.autoSync !== false;
    document.getElementById('notifications').checked = result.notifications !== false;
    document.getElementById('autoDetect').checked = result.autoDetect !== false;
  });
}

function addToCalendar(id) {
  const suggestion = sampleSuggestions.find(s => s.id === id);
  if (!suggestion) return;

  // Create calendar event URL (Google Calendar)
  const startDate = new Date(suggestion.date + ' ' + suggestion.time);
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // +1 hour

  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(suggestion.title)}&dates=${formatDate(startDate)}/${formatDate(endDate)}&details=${encodeURIComponent(suggestion.description)}`;

  chrome.tabs.create({ url: calendarUrl });

  // Animate the card
  const card = document.querySelector(`[data-id="${id}"]`);
  card.style.animation = 'none';
  setTimeout(() => {
    card.style.animation = 'fadeIn 0.5s ease';
    showNotification('Opening Google Calendar...');
  }, 10);
}

function dismissSuggestion(id) {
  const card = document.querySelector(`[data-id="${id}"]`);
  card.style.transform = 'translateX(100%)';
  card.style.opacity = '0';

  setTimeout(() => {
    const index = sampleSuggestions.findIndex(s => s.id === id);
    if (index > -1) {
      sampleSuggestions.splice(index, 1);
      loadSuggestions();
    }
  }, 300);
}

function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #4CAF50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'NEW_EMAIL_DETECTED') {
    // Reload suggestions when new emails are detected
    loadSuggestions();
    loadEmails();
  }
});
