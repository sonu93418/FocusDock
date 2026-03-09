# Development Notes

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:extension` - Build Chrome extension

## Local Storage Keys

- `focusdock_username` - User's name
- `focusdock_mission` - User's 7-day mission
- `focusdock_tasks` - Tasks for all 7 days

## Extension Loading

After building, the extension is in the `extension/` folder. Load it in Chrome:
1. Go to chrome://extensions/
2. Enable Developer mode
3. Click "Load unpacked"
4. Select the `extension` folder

## Development Tips

- Hot reload works in dev mode
- Changes to components update instantly
- localStorage persists data between sessions
- Timer notifications require extension context

## Customization Ideas

- Add sound effects for timer completion
- Add themes (light/dark/custom colors)
- Add export/import for tasks
- Add streak tracking
- Add motivational quotes
- Add background music player
- Add Pomodoro statistics
