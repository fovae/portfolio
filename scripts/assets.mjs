// Builds public/og-image.jpg (1200x630) from the SOMN key art and the PNG favicons
// from public/icons/favicon.svg. Run: npm run assets
import sharp from 'sharp';

const W = 1200, H = 630;
const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".92"/><stop offset=".55" stop-color="#000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity=".1"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" fill="none" stroke="#ffadfe" stroke-opacity=".35"/>
  <g font-family="Helvetica Neue, Helvetica, Arial, sans-serif" fill="#fff3ff">
    <text x="100" y="250" font-size="96" font-weight="700" letter-spacing="8" fill="#ffadfe">FOVAE</text>
    <text x="100" y="320" font-size="40" font-weight="500">Frontend developer &amp; UX/UI designer</text>
    <text x="100" y="380" font-size="26" fill="#b4b0b4">PWAs · design systems · neon worlds in Roblox</text>
  </g>
</svg>`;

await sharp('src/assets/somn/keyart.jpg')
  .resize(W, H, { fit: 'cover', position: 'right' })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-image.jpg');
const icon = await (await import('node:fs/promises')).readFile('public/icons/favicon.svg');
for (const [name, size] of [['favicon-16.png', 16], ['favicon-32.png', 32], ['apple-touch-icon.png', 180]]) {
  await sharp(icon, { density: 72 * (size / 32) * 2 }).resize(size, size).png().toFile(`public/icons/${name}`);
}
console.log('og-image and favicons written');
