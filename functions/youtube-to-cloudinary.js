const path = require('path');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');

const { downloadYouTubeVideoByID } = require('../lib/youtube');

const tmpDir = path.resolve(path.join(__dirname, 'tmp'));

exports.handler = async (event, context) => {
  let config;

  try {
    config = jwt.verify(event.headers.authorization, process.env.APP_SECRET);
  } catch(e) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: 'Access Denied'
      })
    }
  }

  cloudinary.config(config);

  const data = await downloadYouTubeVideoByID(event.queryStringParameters.videoId, tmpDir);
  const { location } = data;

  const results = await cloudinary.uploader.upload(location, {
    resource_type: 'video',
    folder: 'youtube'
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      results
    })
  }
}