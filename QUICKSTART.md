# Quick Start Guide

## For Windows Users

Simply double-click `setup.bat` to automatically:
- Install dependencies
- Create placeholder icons
- Build the extension

Then load it in Chrome!

## For Mac/Linux Users

Run in terminal:
```bash
chmod +x setup.sh
./setup.sh
```

## Manual Setup

```bash
# Install dependencies
npm install

# Create placeholder icons
node scripts/create-placeholder-icons.js

# Build extension
npm run build:extension
```

## Development Mode

To test in browser before building extension:
```bash
npm run dev
```

Then open http://localhost:3000

## Loading in Chrome

1. Open `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked" button
4. Navigate to and select the `extension` folder
5. Click the FocusDock icon in your toolbar!

## Creating Custom Icons

Replace the placeholder icons with real ones:
1. Use the `public/icon128.svg` as a template
2. Create PNG files: icon16.png, icon48.png, icon128.png
3. Place them in the `public/` folder
4. Rebuild: `npm run build:extension`

See `public/ICONS.md` for detailed instructions.

---

**Need help?** Check the main README.md for full documentation.
