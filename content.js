// Content script for Gmail and Outlook integration
console.log('MailMind AI: Content script loaded');

let detectedEvents = [];

// Date and time detection patterns
const datePatterns = [
  /\b(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}(?:st|nd|rd|th)?,?\s+\d{4}\b/gi,
  /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g,
  /\b\d{4}-\d{2}-\d{2}\b/g,
  /\b(?:today|tomorrow|next\s+(?:week|monday|tuesday|wednesday|thursday|friday|saturday|sunday))\b/gi
];

const timePatterns = [
  /\b\d{1,2}:\d{2}\s*(?:am|pm|AM|PM)\b/g,
  /\b\d{1,2}\s*(?:am|pm|AM|PM)\b/g,
  /\bat\s+\d{1,2}(?::\d{2})?\s*(?:am|pm|AM|PM)?\b/gi
];

const meetingKeywords = [
  'meeting', 'call', 'conference', 'standup', 'sync', 'catch up',
  'discussion', 'review', 'presentation', 'interview'
];

const deadlineKeywords = [
  'deadline', 'due', 'submit', 'submission', 'deliver', 'complete by'
];

// Monitor emails for dates and times
function analyzeEmailContent(element) {
  const text = element.textContent || element.innerText;

  if (!text) return null;

  let hasDate = false;
  let hasTime = false;
  let isMeeting = false;
  let isDeadline = false;

  // Check for dates
  for (const pattern of datePatterns) {
    if (pattern.test(text)) {
      hasDate = true;
      break;
    }
  }

  // Check for times
  for (const pattern of timePatterns) {
    if (pattern.test(text)) {
      hasTime = true;
      break;
    }
  }

  // Check for meeting keywords
  for (const keyword of meetingKeywords) {
    if (text.toLowerCase().includes(keyword)) {
      isMeeting = true;
      break;
    }
  }

  // Check for deadline keywords
  for (const keyword of deadlineKeywords) {
    if (text.toLowerCase().includes(keyword)) {
      isDeadline = true;
      break;
    }
  }

  if (hasDate && (hasTime || isMeeting || isDeadline)) {
    return {
      hasDate,
      hasTime,
      isMeeting,
      isDeadline,
      text: text.substring(0, 200) // Store snippet
    };
  }

  return null;
}

// Inject side panel (if not already injected)
function injectSidePanel() {
  if (document.getElementById('mailmind-panel')) return;

  const panel = document.createElement('div');
  panel.id = 'mailmind-panel';
  panel.innerHTML = `
    <div class="mailmind-header">
      <h3>MailMind AI</h3>
      <button class="mailmind-close">×</button>
    </div>
    <div class="mailmind-content">
      <div class="mailmind-section">
        <h4>✨ AI Suggestions</h4>
        <div id="mailmind-suggestions"></div>
      </div>
    </div>
  `;

  document.body.appendChild(panel);

  // Close button functionality
  panel.querySelector('.mailmind-close').addEventListener('click', () => {
    panel.style.right = '-400px';
  });

  // Add toggle button to show panel
  const toggleBtn = document.createElement('button');
  toggleBtn.id = 'mailmind-toggle';
  toggleBtn.innerHTML = '🤖';
  toggleBtn.title = 'Toggle MailMind AI';
  document.body.appendChild(toggleBtn);

  toggleBtn.addEventListener('click', () => {
    const currentRight = panel.style.right;
    panel.style.right = currentRight === '0px' ? '-400px' : '0px';
  });
}

// Update suggestions in side panel
function updateSuggestions(events) {
  const container = document.getElementById('mailmind-suggestions');
  if (!container) return;

  if (events.length === 0) {
    container.innerHTML = '<p class="mailmind-empty">No events detected yet</p>';
    return;
  }

  container.innerHTML = events.map((event, index) => `
    <div class="mailmind-suggestion-card">
      <div class="mailmind-badge">AI Detected</div>
      <p>${event.description}</p>
      <button class="mailmind-btn" data-index="${index}">Add to Calendar</button>
    </div>
  `).join('');

  // Add event listeners to buttons
  container.querySelectorAll('.mailmind-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.dataset.index);
      const event = events[index];
      alert(`Adding to calendar: ${event.description}`);
    });
  });
}

// Initialize
function initialize() {
  console.log('MailMind AI: Initializing...');

  // Inject side panel
  injectSidePanel();

  // Monitor for new emails (simplified version)
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const analysis = analyzeEmailContent(node);
          if (analysis) {
            console.log('MailMind AI: Event detected', analysis);
            detectedEvents.push({
              description: analysis.text.substring(0, 100) + '...',
              type: analysis.isMeeting ? 'meeting' : analysis.isDeadline ? 'deadline' : 'event'
            });
            updateSuggestions(detectedEvents);
          }
        }
      });
    });
  });

  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  console.log('MailMind AI: Monitoring emails...');
}

// Wait for page to load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

// Notify popup of new emails
chrome.runtime.sendMessage({
  type: 'NEW_EMAIL_DETECTED',
  count: detectedEvents.length
});
