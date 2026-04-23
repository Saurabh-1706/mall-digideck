const fs = require('fs');
const path = require('path');

const images = [
  // Dining Extra Images
  { url: 'https://images.unsplash.com/photo-1525648199074-cee30ba79a4a?auto=format&fit=crop&q=80&w=1470', name: 'dining-extra-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1470', name: 'dining-extra-2.jpg' },
  // Attractions (Activities)
  { url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=1470', name: 'attractions-coaster.jpg' },
  { url: 'https://images.unsplash.com/photo-1560093209-646c0d832e14?auto=format&fit=crop&q=80&w=1470', name: 'attractions-waterpark.jpg' },
  { url: 'https://images.unsplash.com/photo-1516806554867-0cce3e430349?auto=format&fit=crop&q=80&w=1470', name: 'attractions-ice-rink.jpg' },
  { url: 'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&q=80&w=1470', name: 'attractions-marine.jpg' },
  // Events
  { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1470', name: 'events-concert.jpg' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379a9a50e261?auto=format&fit=crop&q=80&w=1470', name: 'events-activation.jpg' },
  { url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1470', name: 'events-corporate.jpg' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1470', name: 'events-expo.jpg' }
];

const dir = './public/images';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

async function downloadImages() {
  for (const img of images) {
    console.log(`Downloading ${img.name}...`);
    try {
        const response = await fetch(img.url);
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(path.join(dir, img.name), Buffer.from(buffer));
        console.log(`Saved ${img.name}`);
    } catch (e) {
        console.error(`Failed to download ${img.name}:`, e);
    }
  }
}
downloadImages();
