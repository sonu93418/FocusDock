# 🎯 FocusDock

> **Aesthetic Productivity Browser Extension + Desktop Style Dashboard**

A minimal, beautiful, and highly animated productivity dashboard that helps you manage a 7-day work challenge. The interface feels like a small productivity operating system that lives in your browser.

![FocusDock](https://img.shields.io/badge/version-1.0.0-purple) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-blue) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-10-pink)

## ✨ Features

### 🎨 Beautiful UI
- **Glassmorphism design** with soft gradients and floating cards
- **Smooth animations** powered by Framer Motion
- **Premium aesthetic** with modern typography (Poppins, Inter, JetBrains Mono)
- **Dark theme** with purple and blue accent colors

### 🕐 Live Digital Clock
- Large aesthetic digital clock that updates every second
- Smooth number transitions with glow effects
- Subtle gradient coloring

### ⏱️ Focus Timer
- 25-minute Pomodoro timer
- Circular animated progress ring
- Pulsing animation when active
- Browser notifications on completion
- Start, Pause, and Reset controls

### 📝 Mission Section
- Write and edit your 7-day mission
- Beautiful animated glass card
- Persistent storage

### 📅 7-Day Challenge System
- Grid layout for 7 days
- Add, edit, and delete tasks for each day
- Check off completed tasks with animations
- Strike-through and green check animations
- Visual progress tracking per day

### 📊 Weekly Progress Bar
- Animated gradient progress bar
- Shows completed days out of 7
- Visual day indicators

### 🪟 Mini Floating Widget
- Compact widget with live clock and timer
- Draggable and always on top
- Quick access to essential info

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Google Chrome browser

### Installation

1. **Clone or download the project:**
   ```bash
   cd FocusDock
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Building the Chrome Extension

1. **Build the extension:**
   ```bash
   npm run build:extension
   ```

2. **Load in Chrome:**
   - Open `chrome://extensions/`
   - Enable "Developer mode" (top right)
   - Click "Load unpacked"
   - Select the `extension` folder from your project

3. **Use FocusDock:**
   - Click the FocusDock icon in your Chrome toolbar
   - Enter your name on first launch
   - Start focusing! 🎯

## 🎨 Design Philosophy

FocusDock is designed to be:
- **Minimal** - No clutter, just what you need
- **Beautiful** - Premium aesthetic that you'll want to use
- **Smooth** - Buttery animations and transitions
- **Calming** - Deep navy background with soft gradients
- **Motivating** - Visual progress and achievements

## 🛠️ Technology Stack

- **Frontend:** Next.js 14 (React 18)
- **Styling:** TailwindCSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Storage:** localStorage (Chrome Storage API compatible)
- **Language:** TypeScript

## 📁 Project Structure

```
FocusDock/
├── public/
│   ├── manifest.json          # Chrome extension manifest
│   └── background.js          # Service worker
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx  # Main dashboard
│   │   │   └── WelcomeScreen.tsx
│   │   └── widgets/
│   │       ├── Clock.tsx      # Digital clock
│   │       ├── FocusTimer.tsx # Pomodoro timer
│   │       ├── MissionCard.tsx
│   │       ├── DayCard.tsx    # Day challenge card
│   │       ├── ProgressBar.tsx
│   │       └── MiniWidget.tsx
│   ├── hooks/
│   │   ├── useLocalStorage.ts
│   │   └── useClock.ts
│   ├── utils/
│   │   └── helpers.ts
│   └── styles/
│       └── globals.css
├── scripts/
│   └── prepare-extension.js   # Build script
└── package.json
```

## 🎯 Usage Guide

### First Time Setup
1. Enter your name when prompted
2. Write your 7-day mission in the mission card
3. Start adding tasks to each day

### Managing Tasks
- Click "Add Task" on any day card
- Check off tasks as you complete them
- Edit or delete tasks using the icons
- Watch your progress bar fill up!

### Using the Focus Timer
1. Click "Start" to begin a 25-minute focus session
2. The circular progress ring animates
3. Click "Pause" to pause the timer
4. Click "Reset" to start over
5. Get a notification when the session completes

### Mini Widget
- Click "Mini Widget" to open a floating widget
- Drag it anywhere on the screen
- Shows live clock and timer
- Close when not needed

## 🎨 Color Palette

- **Background:** Deep Navy (#0a0e27)
- **Primary Accent:** Purple (#8b5cf6)
- **Secondary Accent:** Blue (#60a5fa)
- **Glass Effect:** White with low opacity + backdrop blur

## 🔧 Customization

### Changing Timer Duration
Edit `FocusTimer.tsx`:
```typescript
const DEFAULT_TIME = 25 * 60 // Change 25 to your desired minutes
```

### Changing Number of Days
Edit `Dashboard.tsx` and `ProgressBar.tsx`:
```typescript
{Array.from({ length: 7 }, ...)} // Change 7 to desired number
```

## 📝 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- Design inspired by modern productivity tools
- Built with love for focused work
- Powered by the amazing Next.js and Framer Motion teams

---

**Made with 💜 for productivity enthusiasts**

*Stay focused, stay consistent, achieve your goals! 🎯*
# FocusDock
