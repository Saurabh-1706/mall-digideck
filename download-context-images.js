const fs = require('fs');
const path = require('path');

const images = [
  { url: 'https://images.unsplash.com/photo-1519567241046-7f155dc87595?auto=format&fit=crop&q=80&w=2000', name: 'hero-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1555529771-835f59bfc50c?auto=format&fit=crop&q=80&w=2000', name: 'hero-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000', name: 'hero-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=2000', name: 'retail-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=2000', name: 'luxury-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000', name: 'dining-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=2000', name: 'attractions-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2000', name: 'events-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000', name: 'cta-main.jpg' },
  { url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1470', name: 'retail-float-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=1470', name: 'retail-float-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80&w=1470', name: 'retail-float-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1470', name: 'retail-float-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1470', name: 'dining-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1470', name: 'dining-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1470', name: 'dining-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1470', name: 'dining-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=1470', name: 'events-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1505236858219-8359eb29e325?auto=format&fit=crop&q=80&w=1470', name: 'events-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1511578314322-379a9a50e261?auto=format&fit=crop&q=80&w=1470', name: 'events-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1470', name: 'events-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?auto=format&fit=crop&q=80&w=1470', name: 'attractions-extra-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=1470', name: 'attractions-extra-2.jpg' }
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
