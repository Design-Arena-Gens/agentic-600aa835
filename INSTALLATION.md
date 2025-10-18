# MailMind AI - Installation Guide

## 🌐 Live Demo

Visit the live landing page: **https://agentic-600aa835.vercel.app**

## 📦 Chrome Extension Installation

### Method 1: Load Unpacked Extension (Recommended for Testing)

1. **Download the Extension**
   - Clone or download this repository to your local machine

2. **Open Chrome Extensions Page**
   - Open Google Chrome
   - Navigate to `chrome://extensions/`
   - Or click Menu (⋮) → More Tools → Extensions

3. **Enable Developer Mode**
   - Toggle the "Developer mode" switch in the top right corner

4. **Load the Extension**
   - Click the "Load unpacked" button
   - Navigate to and select the project directory (the folder containing `manifest.json`)
   - Click "Select Folder"

5. **Verify Installation**
   - You should see "MailMind AI" appear in your extensions list
   - The MailMind AI icon should appear in your Chrome toolbar
   - Pin the extension to your toolbar for easy access

### Method 2: Pack and Install

1. **Pack the Extension**
   - Go to `chrome://extensions/`
   - Enable Developer mode
   - Click "Pack extension"
   - Select the project directory as the "Extension root directory"
   - Click "Pack Extension"
   - Two files will be created: `.crx` (the extension) and `.pem` (the private key)

2. **Install the Packed Extension**
   - Drag and drop the `.crx` file into the Chrome extensions page
   - Click "Add extension" when prompted

## 🚀 Using MailMind AI

### First Time Setup

1. **Navigate to Your Email**
   - Open Gmail (mail.google.com) or Outlook (outlook.live.com)
   - Log in to your account

2. **Open the Extension**
   - Click the MailMind AI icon in your Chrome toolbar
   - The popup will display with AI suggestions and detected events

3. **Configure Settings** (Optional)
   - Click the settings icon (⚙️) in the popup
   - Enable/disable:
     - Auto-sync with Google Calendar
     - Notifications
     - Auto-detect events in emails
   - Click "Save Settings"

### Daily Usage

1. **View AI Suggestions**
   - The extension automatically scans emails for dates and times
   - AI-detected events appear as suggestion cards
   - Click "Add to Calendar" to create a Google Calendar event
   - Click "Dismiss" to remove a suggestion

2. **Browse Recent Emails**
   - See emails with detected dates and times
   - Dates are highlighted for quick reference

3. **Check Upcoming Events**
   - View your upcoming reminders and calendar events
   - See event times at a glance

### Side Panel Feature

When viewing Gmail or Outlook:
- Look for the 🤖 floating button in the bottom-right corner
- Click it to open the side panel with real-time suggestions
- The panel shows AI-detected events as you browse emails

## 🔧 Troubleshooting

### Extension Not Appearing

- Make sure Developer mode is enabled
- Refresh the extensions page after loading
- Check that all required files are present in the directory

### Not Detecting Emails

- Ensure you're on Gmail or Outlook (supported sites)
- Check that "Auto-detect events" is enabled in settings
- Refresh the email page after installing the extension

### Calendar Integration Not Working

- Make sure you're logged into Google Calendar
- Check that pop-ups are not blocked for the extension
- Verify that "Auto-sync with Google Calendar" is enabled

### Icons Not Displaying

- Clear Chrome cache and reload the extension
- Ensure the `icons/` folder contains all required files
- Try reloading the extension from `chrome://extensions/`

## 🎨 Features

- ✨ **AI Detection**: Automatically finds meetings, deadlines, and events
- 📅 **Calendar Integration**: One-click Google Calendar event creation
- 🎯 **Smart Suggestions**: Intelligent event recommendations
- 🔔 **Reminders**: Preview upcoming events and deadlines
- ⚙️ **Customizable**: Configure auto-sync and notification settings
- 🔒 **Private**: All processing happens locally in your browser

## 📝 Supported Email Providers

- ✅ Gmail (mail.google.com)
- ✅ Outlook (outlook.live.com, outlook.office.com)

## 💡 Tips

- **Pin the Extension**: Right-click the MailMind AI icon and select "Pin" for quick access
- **Keyboard Shortcuts**: Set up a keyboard shortcut in `chrome://extensions/shortcuts`
- **Regular Use**: Check the extension daily to stay on top of your schedule
- **Settings**: Customize the extension behavior to match your workflow

## 🛠️ Technical Details

- **Manifest Version**: V3 (latest Chrome Extension standard)
- **Permissions**: Storage, Active Tab
- **Host Permissions**: Gmail and Outlook domains
- **Privacy**: No external data transmission
- **Processing**: All AI detection runs locally

## 📞 Support

For issues, questions, or feature requests:
- Check the main README.md for documentation
- Review the troubleshooting section above
- Open an issue on the GitHub repository

## 🔄 Updating the Extension

1. Download the latest version of the extension
2. Go to `chrome://extensions/`
3. Click the refresh icon (🔄) on the MailMind AI card
4. Or remove and reinstall using the "Load unpacked" method

---

**Enjoy using MailMind AI! 🎉**

Never miss a meeting or deadline again with intelligent email assistance.
