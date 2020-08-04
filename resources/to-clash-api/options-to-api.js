/**
 * Royale Clash API ask for an IP to its whitelist but
 * Heroku does not provide static IP.
 * IPBurger is a Heroku addon that gives an static IP
 * It require some extra options when sending the requests.
 * This file will give two options when.
 * One, Normal options when developing.
 * The other with options to connecting with IPBurger
*/

const url = require('url');

const clashUrl = 'https://api.clashroyale.com/v1/players/';
const preTag = '%23'; // Replaces the # of player's tag on URL 

function getRightUrlOptions(usingProxy, playerTag) {
  
  const developingUrlOptions = url.parse(clashUrl.concat(preTag, playerTag));
  
  // Token required by RoyaleClash API. Different on each IP that request.  
  const token = usingProxy ? `Bearer ${process.env.AUTHORIZATION_TOKEN}` : `Bearer ${process.env.AUTHORIZATION_LOCAL_TOKEN}`;
  developingUrlOptions.headers = {
    'authorization': token,
  }

  if(usingProxy) {
    console.log('-- [Warning] -- Using proxy! Max 500 request monthly')

    /**  
     * Options/variables for IPBurger Proxy needed on Heroku for get an static IP
     * as it says on https://devcenter.heroku.com/articles/ipburger
     */
    const proxyUrl = url.parse(process.env.FIXIE_URL) //Add it here as env ???
    const viaProxyOptions = {
      host: proxyUrl.hostname,
      port: proxyUrl.port,
      path: developingUrlOptions.href,
      headers: {
        Host: developingUrlOptions.host,
        'Proxy-Authorization': `Basic ${new Buffer.from(proxyUrl.auth).toString('base64')}`,
        'authorization': token,
      }
    }
    //console.log('Final URL options', viaProxyOptions)
    
    // Returns request options using Fixie proxy. 500 request max per month!
    return viaProxyOptions;
  } else {
    // Returns the request options when developing
    //console.log('Final URL options for Develompent', developingUrlOptions)
    return developingUrlOptions;
  }
  
}

module.exports = getRightUrlOptions;



