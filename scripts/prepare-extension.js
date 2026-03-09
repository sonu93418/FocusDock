const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const extensionDir = path.join(__dirname, '..', 'extension');

// Check if out directory exists
if (!fs.existsSync(outDir)) {
  console.error('❌ Error: out directory not found!');
  console.error('Please run "npm run build" first to generate the build files.');
  process.exit(1);
}

// Create extension directory
if (!fs.existsSync(extensionDir)) {
  fs.mkdirSync(extensionDir, { recursive: true });
}

// Copy out directory contents to extension
const copyRecursive = (src, dest) => {
  try {
    if (fs.statSync(src).isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
      fs.readdirSync(src).forEach((file) => {
        copyRecursive(path.join(src, file), path.join(dest, file));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  } catch (error) {
    console.error(`Error copying ${src} to ${dest}:`, error.message);
  }
};

// Copy built files
console.log('📦 Copying built files...');
copyRecursive(outDir, extensionDir);

// Copy manifest and background script
console.log('📋 Copying manifest and background script...');
fs.copyFileSync(
  path.join(__dirname, '..', 'public', 'manifest.json'),
  path.join(extensionDir, 'manifest.json')
);

fs.copyFileSync(
  path.join(__dirname, '..', 'public', 'background.js'),
  path.join(extensionDir, 'background.js')
);

// Rename index.html if it's in a subdirectory
const indexPath = path.join(extensionDir, 'index.html');
if (!fs.existsSync(indexPath)) {
  // Check if it's in a subdirectory
  const findIndex = (dir) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        const result = findIndex(fullPath);
        if (result) return result;
      } else if (file === 'index.html') {
        return fullPath;
      }
    }
    return null;
  };

  const foundIndex = findIndex(extensionDir);
  if (foundIndex) {
    fs.copyFileSync(foundIndex, indexPath);
  }
}

console.log('✅ Extension built successfully!');
console.log(`📂 Extension location: ${extensionDir}`);
console.log('\n🚀 To load in Chrome:');
console.log('1. Open chrome://extensions/');
console.log('2. Enable "Developer mode"');
console.log('3. Click "Load unpacked"');
console.log(`4. Select the "extension" folder: ${extensionDir}`);
