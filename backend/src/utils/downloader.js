const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function downloadAndConvert(url, outputPath, maxWidth) {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: 15000,
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CulturaBot/1.0)' }
  });

  const buffer = Buffer.from(response.data);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  await sharp(buffer)
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

module.exports = { downloadAndConvert };
