# 🚀 FocusDock - Installation & Usage Guide

## ✅ Project Successfully Created!

Your FocusDock productivity dashboard is ready to use. All files have been created with:
- ✨ Beautiful glassmorphism UI
- ⏰ Live digital clock
- ⏱️ Focus timer (25 min Pomodoro)
- 📝 7-day challenge system
- 📊 Progress tracking
- 🪟 Mini floating widget
- 🎨 Smooth Framer Motion animations

---

## 🎯 Quick Start (Recommended)

### Option 1: Automated Setup (Windows)
```cmd
setup.bat
```

### Option 2: Automated Setup (Mac/Linux)
```bash
chmod +x setup.sh
./setup.sh
```

### Option 3: Manual Setup
```bash
# 1. Install dependencies
npm install

# 2. Create placeholder icons
node scripts/create-placeholder-icons.js

# 3. Build the extension
npm run build:extension
```

---

## 🌐 Test in Browser First (Recommended)

Before building the extension, test it in your browser:

```bash
npm run dev
```

Then open: http://localhost:3000

This lets you:
- ✅ See the full dashboard
- ✅ Test all features
- ✅ Make customizations
- ✅ See hot-reload changes

---

## 🔧 Load as Chrome Extension

After building with `npm run build:extension`:

1. **Open Chrome Extensions**
   - Go to `chrome://extensions/`

2. **Enable Developer Mode**
   - Toggle "Developer mode" in the top-right corner

3. **Load Unpacked Extension**
   - Click "Load unpacked" button
   - Navigate to the `extension` folder inside your FocusDock project
   - Select the folder

4. **Use FocusDock**
   - Click the FocusDock icon in your Chrome toolbar
   - Enjoy your productivity dashboard!

---

## 📁 Project Structure

```
FocusDock/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Main page
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx   # Main dashboard component
│   │   │   └── WelcomeScreen.tsx
│   │   └── widgets/
│   │       ├── Clock.tsx       # Live digital clock
│   │       ├── FocusTimer.tsx  # Pomodoro timer
│   │       ├── MissionCard.tsx # Mission editor
│   │       ├── DayCard.tsx     # Daily task cards
│   │       ├── ProgressBar.tsx # Weekly progress
│   │       └── MiniWidget.tsx  # Floating mini widget
│   ├── hooks/                  # Custom React hooks
│   ├── utils/                  # Helper functions
│   ├── styles/                 # Global styles
│   └── types/                  # TypeScript definitions
├── public/
│   ├── manifest.json           # Chrome extension manifest
│   ├── background.js           # Service worker
│   └── icon*.png               # Extension icons
├── scripts/                    # Build scripts
└── extension/                  # Built extension (after build)
```

---

## 🎨 Features Overview

### 1. **Welcome Screen**
- Enter your name once
- Stored locally
- Personalized greeting

### 2. **Mission Card**
- Write your 7-day mission
- Edit anytime
- Motivational focus

### 3. **Live Clock**
- Large digital display
- Updates every second
- Smooth animations
- Glowing effects

### 4. **Focus Timer**
- 25-minute Pomodoro timer
- Circular progress visualization
- Start/Pause/Reset controls
- Browser notifications
- Pulsing animation when active

### 5. **7-Day Challenge**
- 7 individual day cards
- Add unlimited tasks per day
- Check off completed tasks
- Edit and delete tasks
- Visual completion indicators

### 6. **Progress Tracking**
- Animated progress bar
- Shows completed days
- Gradient effects
- Day-by-day indicators

### 7. **Mini Widget**
- Floating draggable widget
- Shows clock and timer
- Always on top
- Minimalist view

---

## 🎯 Usage Tips

### Getting Started
1. Enter your name on first launch
2. Write your 7-day mission
3. Add tasks to Day 1
4. Start the focus timer
5. Check off tasks as you complete them

### Daily Workflow
1. Open FocusDock each day
2. Review your mission
3. Look at today's tasks
4. Start a focus session
5. Check off completed work
6. Track your progress

### Customization
- **Change timer duration:** Edit `src/components/widgets/FocusTimer.tsx`
- **Change number of days:** Edit `src/components/dashboard/Dashboard.tsx`
- **Customize colors:** Edit `tailwind.config.js`
- **Add custom fonts:** Edit `src/styles/globals.css`

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next out extension node_modules
npm install
npm run build:extension
```

### Icons Not Showing
- Run: `node scripts/create-placeholder-icons.js`
- Or create custom icons (see `public/ICONS.md`)

### Extension Not Loading
- Make sure you ran `npm run build:extension`
- Check that `extension` folder exists
- Try disabling/re-enabling the extension in Chrome

### Timer Notifications Not Working
- Allow notifications in Chrome settings
- Extension must be loaded (not just dev mode)

---

## 📦 Scripts Reference

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build production version |
| `npm run build:extension` | Build Chrome extension |
| `npm run setup` | Install deps + create icons |
| `node scripts/create-placeholder-icons.js` | Generate placeholder icons |

---

## 🎨 Customization Guide

### Change Color Theme
Edit `tailwind.config.js`:
```js
colors: {
  'deep-navy': '#0a0e27',      // Background
  'purple-accent': '#8b5cf6',   // Primary
  'blue-accent': '#60a5fa',     // Secondary
}
```

### Change Timer Duration
Edit `src/components/widgets/FocusTimer.tsx`:
```typescript
const DEFAULT_TIME = 25 * 60 // Change 25 to desired minutes
```

### Add More Days
Edit `src/components/dashboard/Dashboard.tsx`:
```typescript
{Array.from({ length: 7 }, ...)} // Change 7 to desired number
```

### Custom Fonts
Edit `src/styles/globals.css` - import different Google Fonts

---

## 📚 Documentation

- **README.md** - Full project documentation
- **QUICKSTART.md** - Quick installation guide
- **DEVELOPMENT.md** - Development tips
- **public/ICONS.md** - Icon creation guide

---

## 🎉 You're All Set!

Your FocusDock project is ready to use. Here's what to do next:

1. ✅ Run `npm install` to get dependencies
2. ✅ Run `npm run dev` to test in browser
3. ✅ Run `npm run build:extension` to create extension
4. ✅ Load in Chrome and start being productive!

**Questions?** Check the documentation files or the source code comments.

**Enjoy your productivity journey! 🚀**

---

Made with 💜 by the FocusDock team
