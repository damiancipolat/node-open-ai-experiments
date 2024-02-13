require('dotenv').config();
const Twit = require('twit');
const config = require('./config');

console.log('xxx', config);

const T = new Twit({
  ...config,
  timeout_ms: 60 * 1000,
  strictSSL: true,
});

var stream = T.stream('statuses/sample');

stream.on('tweet', function (tweet) {
  console.log(tweet);
});
/*
const botHashTag = '#contraBot';
const botUser = '@damcipolat';

var stream = T.stream('statuses/filter', { track: '@<your_twitter_username>' });

stream.on('tweet', function (tweet) {
  console.log(tweet);
});

stream.on('error', (error) => {
  console.log(error);
});
*/

/*
const stream = T.stream('statuses/filter', { track: botUser });

stream.on('connected', () => {
  console.log('connected to twitter!');
});

stream.on('tweet', (tweet) => {
  console.log(
    `Se ha mencionado a @TU_NOMBRE_DE_USUARIO en el tweet: ${tweet.text}`,
    tweet
  );
});

stream.on('error', (error) => {
  console.log(error);
});*/
