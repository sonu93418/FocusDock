# FocusDock Extension Icons

This folder should contain the following icon files:

- `icon16.png` - 16x16 pixels
- `icon48.png` - 48x48 pixels  
- `icon128.png` - 128x128 pixels

## Creating Icons

You can use the provided `icon128.svg` as a base and convert it to PNG files using:

1. **Online tools:**
   - https://cloudconvert.com/svg-to-png
   - https://www.aconvert.com/image/svg-to-png/

2. **Command line (if you have ImageMagick):**
   ```bash
   magick convert -density 300 -background none icon128.svg -resize 128x128 icon128.png
   magick convert -density 300 -background none icon128.svg -resize 48x48 icon48.png
   magick convert -density 300 -background none icon128.svg -resize 16x16 icon16.png
   ```

3. **Use an image editor:**
   - Open `icon128.svg` in Figma, Sketch, or Adobe Illustrator
   - Export as PNG at 16x16, 48x48, and 128x128

## Temporary Workaround

For now, you can use any PNG images renamed as:
- `icon16.png`
- `icon48.png`
- `icon128.png`

The extension will work with placeholder icons until you create proper ones.
