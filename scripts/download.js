require('dotenv').config();
const jwt = require('jsonwebtoken');
const fetch = require('node-fetch');

(async function run() {
  const token = jwt.sign({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  }, process.env.APP_SECRET);

  const response = await fetch('http://localhost:8888/.netlify/functions/youtube-to-cloudinary?videoId=bRth3NXVlLA', {
    headers: {
      Authorization: token
    }
  });

  const results = await response.json();

  console.log('results', results);
})();