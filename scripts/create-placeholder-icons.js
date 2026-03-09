// Simple script to create placeholder icon files
// Run with: node scripts/create-placeholder-icons.js

const fs = require("fs");
const path = require("path");

const publicDir = path.join(__dirname, "..", "public");

// Check if public directory exists
if (!fs.existsSync(publicDir)) {
  console.error("❌ Error: public directory not found!");
  process.exit(1);
}

// Create a simple base64 PNG (1x1 transparent pixel)
const transparentPixel = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
  "base64",
);

console.log("Creating placeholder icons...");

// Create placeholder icons (just transparent pixels for now)
const icons = ["icon16.png", "icon48.png", "icon128.png"];
let successCount = 0;

icons.forEach((filename) => {
  try {
    const filepath = path.join(publicDir, filename);
    fs.writeFileSync(filepath, transparentPixel);
    console.log(`✅ Created ${filename}`);
    successCount++;
  } catch (error) {
    console.error(`❌ Failed to create ${filename}:`, error.message);
  }
});

if (successCount === icons.length) {
  console.log("\n⚠️  These are placeholder icons!");
  console.log(
    "📌 Please replace them with proper icons using icon128.svg as reference.",
  );
  console.log("📖 See public/ICONS.md for instructions.\n");
} else {
  console.error(
    `\n❌ Only ${successCount}/${icons.length} icons created successfully.`,
  );
  process.exit(1);
}
