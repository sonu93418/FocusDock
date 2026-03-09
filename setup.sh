#!/bin/bash

echo "===================================="
echo " FocusDock Setup Script"
echo "===================================="
echo ""

echo "[1/3] Installing dependencies..."
npm install

echo ""
echo "[2/3] Creating placeholder icons..."
node scripts/create-placeholder-icons.js

echo ""
echo "[3/3] Building extension..."
npm run build:extension

echo ""
echo "===================================="
echo " Setup Complete!"
echo "===================================="
echo ""
echo "Next steps:"
echo "1. Open Chrome and go to chrome://extensions/"
echo "2. Enable 'Developer mode' (top right)"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'extension' folder"
echo ""
echo "Or run 'npm run dev' to test in browser first."
echo ""
