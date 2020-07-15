const https = require('https');

const url = 'https://api.clashroyale.com/v1/players/';
const preTag = '%23';
const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6Ijg1NDM1YTAwLTQ4ODAtNGEyMi05ZDA2LWQ4ZDYyODMzYTNhZSIsImlhdCI6MTU5NDIzMDkyNCwic3ViIjoiZGV2ZWxvcGVyLzYwOGUyMzI4LWZkNzYtMjY5MS01OTkzLTc4NWMzZjdkNTIyMSIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI4MC4yMTcuMTk1LjIzNCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.RDXEkTLmgRGIg8uW74BuvC5j3lysiGqkiuXVNqI5ubsaEmSNs0f2H2ZX39hDxEfhf4hzcwK1VGPpiB_RttckDw';
const options = {
  headers: {
    'authorization': token,
  }
}

//const playerTag = '8CRRY8J02';

function makeRequestByPlayer(playerTag) {
  const wholeurl = url.concat(preTag, playerTag);

  return new Promise((resolve, reject) => {
    https.get(wholeurl, options, receiving => {
      let infoComming = '';
      receiving.on('data', chunk => {
        infoComming += chunk;
      })
      receiving.on('end', () => {
        let playerData = JSON.parse(infoComming);
        resolve(playerData);
      })
    })
    .on('error', err => {
      return reject(error);
    }) 
  })


}

module.exports = makeRequestByPlayer;



