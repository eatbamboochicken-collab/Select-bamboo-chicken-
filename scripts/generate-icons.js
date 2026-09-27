import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const ICONS_DIR = path.resolve('./public/icons');
if (!fs.existsSync(ICONS_DIR)) {
  fs.mkdirSync(ICONS_DIR, { recursive: true });
}

// 1. Standard SVG Icon (512x512)
const standardSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="40%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1B1B1F" />
      <stop offset="100%" stop-color="#101012" />
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="45%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" rx="104" fill="url(#bgGrad)" />
  <circle cx="256" cy="230" r="180" fill="url(#glow)" />
  
  <!-- Subtle Outer Border -->
  <rect x="8" y="8" width="496" height="496" rx="96" fill="none" stroke="#D4AF37" stroke-width="2.5" stroke-opacity="0.3" />

  <!-- Central Chicken Crest / Emblem -->
  <g transform="translate(256, 215) scale(1.35)">
    <!-- Rooster Silhouette / Crest Motif -->
    <!-- Comb -->
    <path d="M-6 -78 C-14 -88 -6 -100 4 -96 C14 -94 14 -84 10 -76 C20 -82 28 -74 24 -65 C30 -68 36 -62 30 -54 C24 -46 16 -46 12 -46" 
          fill="url(#goldGrad)" />
    <!-- Beak -->
    <path d="M22 -52 L38 -46 L20 -40 Z" fill="#FDE047" />
    <!-- Wattle -->
    <path d="M12 -38 C14 -30 20 -28 16 -22 C12 -16 6 -20 8 -34 Z" fill="url(#goldGrad)" />
    <!-- Head & Body -->
    <path d="M0 -66 C14 -66 22 -54 18 -38 C16 -24 24 -10 32 4 C40 18 36 40 22 52 C10 62 -12 62 -26 50 C-42 36 -46 12 -38 -8 C-34 -18 -30 -32 -26 -44 C-20 -58 -10 -66 0 -66 Z" 
          fill="url(#goldGrad)" />
    <!-- Eye -->
    <circle cx="8" cy="-50" r="3.5" fill="#121214" />
    <!-- Wing Feathers Arc -->
    <path d="M-10 -10 C6 -6 18 10 12 26 C8 34 -4 40 -16 34 C-26 28 -28 14 -22 2 C-18 -6 -14 -10 -10 -10 Z" 
          fill="#1B1B1F" opacity="0.85" />
    <path d="M-6 -2 C6 0 12 12 8 22 C4 28 -4 30 -12 26 C-18 22 -20 12 -16 4 Z" 
          fill="url(#goldGrad)" />
  </g>

  <!-- Bamboo Leaf Sprigs (Flanking) -->
  <g stroke="url(#goldGrad)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.75">
    <!-- Left Stalk -->
    <path d="M96 230 Q116 200 126 165" />
    <path d="M110 185 Q85 175 75 190" />
    <path d="M118 168 Q100 150 96 135" />
    <!-- Right Stalk -->
    <path d="M416 230 Q396 200 386 165" />
    <path d="M402 185 Q427 175 437 190" />
    <path d="M394 168 Q412 150 416 135" />
  </g>

  <!-- Brand Typography -->
  <!-- "BAMBOO CHICKEN" -->
  <text x="256" y="388" 
        text-anchor="middle" 
        font-family="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
        font-size="34" 
        font-weight="800" 
        letter-spacing="5" 
        fill="#FFFFFF">
    BAMBOO CHICKEN
  </text>

  <!-- Gold Pill for "SELECT" -->
  <g transform="translate(256, 428)">
    <rect x="-86" y="-20" width="172" height="40" rx="20" fill="url(#goldGrad)" />
    <text x="0" y="8" 
          text-anchor="middle" 
          font-family="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
          font-size="20" 
          font-weight="900" 
          letter-spacing="6" 
          fill="#121214">
      SELECT
    </text>
  </g>
</svg>`;

// 2. Maskable SVG Icon (Safe zone radius ~204px inside 512x512)
// Full bleed square background, scaled inner graphics to stay safely within center 80% circle
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="mGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FDE047" />
      <stop offset="40%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#B45309" />
    </linearGradient>
    <linearGradient id="mBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#18181C" />
      <stop offset="100%" stop-color="#0E0E10" />
    </linearGradient>
    <radialGradient id="mGlow" cx="50%" cy="45%" r="40%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.16" />
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0" />
    </radialGradient>
  </defs>

  <!-- Full bleed square background for maskable (no rounded corners, Android will crop it) -->
  <rect width="512" height="512" fill="url(#mBgGrad)" />
  <circle cx="256" cy="245" r="160" fill="url(#mGlow)" />

  <!-- Inner content scaled by ~0.76 to strictly fit inside Android safe circle (diameter 408px) -->
  <g transform="translate(256, 252) scale(0.76) translate(-256, -252)">
    <!-- Central Chicken Crest / Emblem -->
    <g transform="translate(256, 205) scale(1.35)">
      <!-- Comb -->
      <path d="M-6 -78 C-14 -88 -6 -100 4 -96 C14 -94 14 -84 10 -76 C20 -82 28 -74 24 -65 C30 -68 36 -62 30 -54 C24 -46 16 -46 12 -46" 
            fill="url(#mGoldGrad)" />
      <!-- Beak -->
      <path d="M22 -52 L38 -46 L20 -40 Z" fill="#FDE047" />
      <!-- Wattle -->
      <path d="M12 -38 C14 -30 20 -28 16 -22 C12 -16 6 -20 8 -34 Z" fill="url(#mGoldGrad)" />
      <!-- Head & Body -->
      <path d="M0 -66 C14 -66 22 -54 18 -38 C16 -24 24 -10 32 4 C40 18 36 40 22 52 C10 62 -12 62 -26 50 C-42 36 -46 12 -38 -8 C-34 -18 -30 -32 -26 -44 C-20 -58 -10 -66 0 -66 Z" 
            fill="url(#mGoldGrad)" />
      <!-- Eye -->
      <circle cx="8" cy="-50" r="3.5" fill="#121214" />
      <!-- Wing Feathers Arc -->
      <path d="M-10 -10 C6 -6 18 10 12 26 C8 34 -4 40 -16 34 C-26 28 -28 14 -22 2 C-18 -6 -14 -10 -10 -10 Z" 
            fill="#1B1B1F" opacity="0.85" />
      <path d="M-6 -2 C6 0 12 12 8 22 C4 28 -4 30 -12 26 C-18 22 -20 12 -16 4 Z" 
            fill="url(#mGoldGrad)" />
    </g>

    <!-- Bamboo Leaf Sprigs -->
    <g stroke="url(#mGoldGrad)" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.75">
      <path d="M96 220 Q116 190 126 155" />
      <path d="M110 175 Q85 165 75 180" />
      <path d="M416 220 Q396 190 386 155" />
      <path d="M402 175 Q427 165 437 180" />
    </g>

    <!-- Brand Typography -->
    <text x="256" y="380" 
          text-anchor="middle" 
          font-family="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
          font-size="34" 
          font-weight="800" 
          letter-spacing="5" 
          fill="#FFFFFF">
      BAMBOO CHICKEN
    </text>

    <!-- Gold Pill for "SELECT" -->
    <g transform="translate(256, 420)">
      <rect x="-86" y="-20" width="172" height="40" rx="20" fill="url(#mGoldGrad)" />
      <text x="0" y="8" 
            text-anchor="middle" 
            font-family="'Outfit', 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" 
            font-size="20" 
            font-weight="900" 
            letter-spacing="6" 
            fill="#121214">
        SELECT
      </text>
    </g>
  </g>
</svg>`;

async function main() {
  console.log('Generating PWA icons...');
  
  // Write SVGs
  fs.writeFileSync(path.join(ICONS_DIR, 'icon.svg'), standardSvg);
  fs.writeFileSync(path.join(ICONS_DIR, 'icon-maskable.svg'), maskableSvg);
  fs.writeFileSync(path.resolve('./public/favicon.svg'), standardSvg);

  const stdBuffer = Buffer.from(standardSvg);
  const maskableBuffer = Buffer.from(maskableSvg);

  // Generate PNGs
  await sharp(stdBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-512.png'));
  console.log('✓ Created icon-512.png');

  await sharp(stdBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-192.png'));
  console.log('✓ Created icon-192.png');

  await sharp(maskableBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(ICONS_DIR, 'icon-maskable-512.png'));
  console.log('✓ Created icon-maskable-512.png');

  await sharp(stdBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(ICONS_DIR, 'apple-touch-icon.png'));
  console.log('✓ Created apple-touch-icon.png');

  await sharp(stdBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.resolve('./public/apple-touch-icon.png'));
  console.log('✓ Created public/apple-touch-icon.png');

  await sharp(stdBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.resolve('./public/favicon.png'));
  console.log('✓ Created public/favicon.png');

  console.log('All icons generated successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
