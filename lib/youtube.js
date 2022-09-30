const fs = require('fs');
const ytdl = require('ytdl-core');

async function downloadYouTubeVideoByID(youtubeId, location) {
  const url = `https://www.youtube.com/watch?v=${youtubeId}`;
  const info = await ytdl.getBasicInfo(url);

  const { title } = info.videoDetails;
  const fileLocation = `${location}/${title}.mp4`;

  if (!fs.existsSync(location)) {
    fs.mkdirSync(location);
  }

  const results = await new Promise((resolve, reject) => {
    const writeableStream = fs.createWriteStream(fileLocation);

    writeableStream.on('finish', () => {
      resolve({
        info,
        location: fileLocation
      });
    });

    writeableStream.on('error', (error) => {
      console.log('error', error)
      reject({
        error,
        location: fileLocation
      })
    });

    ytdl(url).pipe(writeableStream);
  });

  return results;

}

module.exports.downloadYouTubeVideoByID = downloadYouTubeVideoByID;