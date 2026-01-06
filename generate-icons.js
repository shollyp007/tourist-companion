// Quick PWA Icon Generator
// This creates simple placeholder icons with your brand colors
// For production, use a proper logo designer or online tool

const fs = require('fs');
const path = require('path');

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'public', 'icons');

// Create SVG icons with your brand gradient
sizes.forEach(size => {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#grad)"/>

  <!-- Globe icon -->
  <circle cx="${size/2}" cy="${size/2}" r="${size * 0.3}" stroke="white" stroke-width="${size * 0.04}" fill="none"/>
  <ellipse cx="${size/2}" cy="${size/2}" rx="${size * 0.13}" ry="${size * 0.3}" stroke="white" stroke-width="${size * 0.025}" fill="none"/>
  <line x1="${size * 0.2}" y1="${size/2}" x2="${size * 0.8}" y2="${size/2}" stroke="white" stroke-width="${size * 0.025}"/>

  <!-- Map pin -->
  <path d="M ${size/2} ${size * 0.25}
           C ${size * 0.42} ${size * 0.25}, ${size * 0.38} ${size * 0.29}, ${size * 0.38} ${size * 0.33}
           C ${size * 0.38} ${size * 0.38}, ${size/2} ${size * 0.48}, ${size/2} ${size * 0.48}
           C ${size/2} ${size * 0.48}, ${size * 0.62} ${size * 0.38}, ${size * 0.62} ${size * 0.33}
           C ${size * 0.62} ${size * 0.29}, ${size * 0.58} ${size * 0.25}, ${size/2} ${size * 0.25} Z"
           fill="white"/>
  <circle cx="${size/2}" cy="${size * 0.33}" r="${size * 0.02}" fill="#667eea"/>
</svg>`;

  const filename = `icon-${size}x${size}.png`;
  const svgFilename = `icon-${size}x${size}.svg`;

  // Save SVG files (browsers can use these directly)
  fs.writeFileSync(path.join(iconsDir, svgFilename), svg);

  console.log(`✓ Created ${svgFilename}`);
});

console.log('\n✓ Icon generation complete!');
console.log('\nNOTE: SVG icons have been created. For better compatibility,');
console.log('convert them to PNG using an online tool like:');
console.log('- https://realfavicongenerator.net/');
console.log('- https://www.pwabuilder.com/imageGenerator');
console.log('\nOr use the SVG files directly - modern browsers support them!\n');
