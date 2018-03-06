const express = require('express');
const Twit = require('twit');
const config = require('./config');

const app = express();
<<<<<<< HEAD

var T = new Twit({
  consumer_key:         config.consumer_key,
  consumer_secret:      config.consumer_secret,
  access_token:         config.access_key,
  access_token_secret:  config.acess_token_secret
=======
const T = new Twit({
	consumer_key:        'config.consumer_key',
	consumer_secret:     'config.consumer_secret',
	access_token:        'config.access_token',
	access_token_secret: 'config.access_token_secret'
>>>>>>> 5d478f1a404a868a21ff8f8307c95055aab3071a
});

app.use('/static', express.static('public'));

// View engine setup
app.set('view engine', 'pug');
let numOfTweets = 5;
let numOfFriends = 5;
let numOfMessages = 5;

// Create an object to hold the data from Twitter
var myTweetArray = {
  tweets: {},
  friends: {},
  direct_messages: {}
};

// Tweet timeline
T.get('statuses/user_timeline', {count: numOfTweets}, function(err, data, response) {
  if (err) {
    console.log(err);
  } 
// Add the amount of elapsed time since each tweet to the data object
  for ( i = 0; i < numOfTweets; i++) {
    data.timeFromTweet = returnTimeFromTweet(data.created_at)
  }
// Add the data to the myTweetArray
  myTweetArray.tweets = data;
});

// Following
T.get('friends/list', { count: numOfFriends },  function (err, data, response) {
  if (err) {
    console.log(err);
  }
  myTweetArray.friends = data;
});

// Direct Messages
T.get('direct_messages', { count: numOfMessages },  function (err, data, response) {
  if(err) {
    console.log(err);
  }
// Add the amount of elapsed time since each message to the data object
  for ( i = 0; i < numOfMessages; i++) {
    data.timeFromTweet = returnTimeFromTweet(data.created_at);
  }
  myTweetArray.direct_messages = data;
});

app.get('/', (req, res) => {
	res.render('index', { myTweetArray : myTweetArray });
});

app.listen(3000);

//Functions
function returnTimeFromTweet(timeStamp) {
  var date1 = new Date(timeStamp);
  var date2 = new Date();
  msDifference = date2-date1; // Difference in milliseconds
  secondsDifference = Math.floor(msDifference/1000);
  minutesDifference = Math.floor(msDifference/60000);
  if (secondsDifference < 60) {
    timeFromTweet = secondsDifference + "s";
  } else if (minutesDifference < 60) {
    timeFromTweet = minutesDifference + "m";
  } else if (minutesDifference < 1440) { // minutes in a day
    timeFromTweet = (Math.floor(minutesDifference/60)) + "h"; 
  } else if (minutesDifference < 42560) { // minutes in a month
    timeFromTweet = (Math.floor(minutesDifference/1440)) + "d"; 
  } else if (minutesDifference < 525949) { // minutes in a year
    timeFromTweet = (Math.floor(minutesDifference/42560)) + "mo"; 
  } else {
    timeFromTweet = (Math.floor(minutesDifference/525949)) + "yr"; 
  }
  return timeFromTweet;
}
