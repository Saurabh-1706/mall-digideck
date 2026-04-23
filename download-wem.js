const https = require('https');
const fs = require('fs');

const delay = ms => new Promise(r => setTimeout(r, ms));

function get(url, opts = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, opts, res => {
      if (res.statusCode >= 300 && res.headers.location) {
        return get(res.headers.location, opts).then(resolve).catch(reject);
      }
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

function download(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.headers.location) {
        file.close();
        return download(res.headers.location, dest).then(resolve);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        const size = fs.statSync(dest).size;
        console.log(`OK   ${dest.split(/[\\/]/).pop()} ${(size/1024).toFixed(0)}KB`);
        resolve(true);
      });
    }).on('error', e => { file.close(); resolve(false); });
  });
}

// Pexels free API — search queries relevant to WEM content
const PEXELS_KEY = 'YOUR_PEXELS_KEY'; // free at pexels.com/api

const searches = [
  { query: 'shopping mall interior luxury',        name: 'wem-real-interior.jpg' },
  { query: 'shopping mall exterior large',         name: 'wem-real-exterior.jpg' },
  { query: 'indoor roller coaster amusement park', name: 'wem-real-galaxyland.jpg' },
  { query: 'indoor water park wave pool',          name: 'wem-real-waterpark.jpg' },
  { query: 'ice skating rink indoor arena',        name: 'wem-real-ice-palace.jpg' },
  { query: 'luxury retail mall shopping corridor', name: 'wem-real-corridor.jpg' },
  { query: 'grand mall atrium architecture',       name: 'wem-real-atrium.jpg' },
  { query: 'concert event arena crowd',            name: 'wem-real-event.jpg' },
];

async function main() {
  if (PEXELS_KEY === 'YOUR_PEXELS_KEY') {
    console.log('No Pexels key — using direct Unsplash source IDs instead');
    // Unsplash specific photo IDs (no API key needed for direct access)
    const unsplashPhotos = [
      { id: 'photo-1519999482648-25049ddd37b1', name: 'wem-real-exterior.jpg',   label: 'mall exterior' },
      { id: 'photo-1555529771-7888783a18d3',    name: 'wem-real-interior.jpg',   label: 'mall interior' },
      { id: 'photo-1582481725274-d63bdf929a90', name: 'wem-real-galaxyland.jpg', label: 'amusement indoor' },
      { id: 'photo-1601628828688-632f38a5a7d0', name: 'wem-real-waterpark.jpg',  label: 'waterpark indoor' },
      { id: 'photo-1578662996442-48f60103fc96', name: 'wem-real-ice-palace.jpg', label: 'ice skating indoor' },
      { id: 'photo-1567449303078-57ad995bd17f', name: 'wem-real-atrium.jpg',     label: 'mall atrium' },
      { id: 'photo-1486325212027-8081e485255e', name: 'wem-real-corridor.jpg',   label: 'mall corridor' },
      { id: 'photo-1560518883-ce09059eeffa',    name: 'wem-real-luxury.jpg',     label: 'luxury retail' },
    ];

    for (const p of unsplashPhotos) {
      const url = `https://images.unsplash.com/${p.id}?w=1400&q=85&fm=jpg&fit=crop`;
      await download(url, `./public/images/${p.name}`);
      await delay(800);
    }
  }
  console.log('Done!');
}

main();
