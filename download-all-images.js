const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const dir = './public/images';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// All images with proper direct download URLs
const images = [
  // HERO
  { url: 'https://images.unsplash.com/photo-1519567241046-7f155dc87595?w=1600&q=80&fm=jpg&fit=crop', name: 'hero-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1555529771-835f59bfc50c?w=1600&q=80&fm=jpg&fit=crop', name: 'hero-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80&fm=jpg&fit=crop', name: 'hero-3.jpg' },

  // RETAIL
  { url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80&fm=jpg&fit=crop', name: 'retail-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&fm=jpg&fit=crop', name: 'retail-float-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80&fm=jpg&fit=crop', name: 'retail-float-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80&fm=jpg&fit=crop', name: 'retail-float-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=1200&q=80&fm=jpg&fit=crop', name: 'retail-float-4.jpg' },

  // LUXURY
  { url: 'https://images.unsplash.com/photo-1512163143273-bde0e3cc7407?w=1600&q=80&fm=jpg&fit=crop', name: 'luxury-main.jpg' },

  // DINING
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80&fm=jpg&fit=crop', name: 'dining-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80&fm=jpg&fit=crop', name: 'dining-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80&fm=jpg&fit=crop', name: 'dining-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1200&q=80&fm=jpg&fit=crop', name: 'dining-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=1200&q=80&fm=jpg&fit=crop', name: 'dining-extra-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&fm=jpg&fit=crop', name: 'dining-extra-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&q=80&fm=jpg&fit=crop', name: 'dining-main.jpg' },

  // ATTRACTIONS (activities inside mall)
  { url: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=1200&q=80&fm=jpg&fit=crop', name: 'attractions-coaster.jpg' },
  { url: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&q=80&fm=jpg&fit=crop', name: 'attractions-waterpark.jpg' },
  { url: 'https://images.unsplash.com/photo-1548103113-d9da97e4c8d0?w=1200&q=80&fm=jpg&fit=crop', name: 'attractions-ice-rink.jpg' },
  { url: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80&fm=jpg&fit=crop', name: 'attractions-marine.jpg' },
  { url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1200&q=80&fm=jpg&fit=crop', name: 'attractions-extra-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=1200&q=80&fm=jpg&fit=crop', name: 'attractions-extra-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?w=1600&q=80&fm=jpg&fit=crop', name: 'attractions-main.jpg' },

  // EVENTS
  { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80&fm=jpg&fit=crop', name: 'events-concert.jpg' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379a9a50e261?w=1200&q=80&fm=jpg&fit=crop', name: 'events-activation.jpg' },
  { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&fm=jpg&fit=crop', name: 'events-corporate.jpg' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fm=jpg&fit=crop', name: 'events-expo.jpg' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1600&q=80&fm=jpg&fit=crop', name: 'events-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=1200&q=80&fm=jpg&fit=crop', name: 'events-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=1200&q=80&fm=jpg&fit=crop', name: 'events-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379a9a50e261?w=1200&q=80&fm=jpg&fit=crop', name: 'events-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fm=jpg&fit=crop', name: 'events-4.jpg' },

  // CTA
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&fm=jpg&fit=crop', name: 'cta-main.jpg' },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const existing = fs.existsSync(dest);
    if (existing) {
      const size = fs.statSync(dest).size;
      if (size > 1000) { console.log(`  Skip (exists): ${path.basename(dest)}`); return resolve(); }
    }
    const file = fs.createWriteStream(dest);
    const proto = url.startsWith('https') ? https : http;
    proto.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  for (const img of images) {
    const dest = path.join(dir, img.name);
    try {
      await downloadFile(img.url, dest);
      const size = fs.statSync(dest).size;
      console.log(`✓ ${img.name} (${(size/1024).toFixed(0)}KB)`);
    } catch (e) {
      console.error(`✗ Failed: ${img.name} - ${e.message}`);
    }
  }
  console.log('\nAll done!');
}
main();
