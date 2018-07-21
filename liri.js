require('dotenv').config(); // to store keys and values separate from code 

var Twitter = require('twitter'); // grab Twitter NPM package
var tweetsArray = []; // create an array to hold tweets
var request = require('request'); // grab Require NPM package
var fs = require('fs'); // grab FS NPM package
var keys = require("./keys.js"); // import keys and tokens
var client = new Twitter(keys.twitter); // access Twitter credentials
var Spotify = require('node-spotify-api'); // grab Spotify NPM package
var spotify = new Spotify(keys.spotify); // access Spotify credentials

// Global function using the JS Switch Statement to set up several code blocks that can be executed independently

var select = function runCommands(command, commandParam) {
    switch (command) {
        case 'my-tweets':
            myTweets();
            break;
        case 'spotify-this-song':
            mySpotify(commandParam);
            break;
        case 'movie-this':
            myMovies(commandParam);
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
}

// Twitter setup to return tweets

function myTweets() {

    // Make a GET request against the API via convenience method by passing the endpoint and parameters: client.get('path', {params}, callback())

    client.get('statuses/user_timeline', { screen_name: 'Liri Noding', count: 20, exclude_replies: true, trim_user: true }, function (error, tweets, response) {

        if (!error) {

            tweetsArray = tweets;  // if no error, pull tweets into array and load response from loop

            for (i = 0; i < tweetsArray.length; i++) {
                console.log("Tweet: " + tweetsArray[i].text); // The actual tweet
                console.log("Date Created: " + tweetsArray[i].created_at); // Date created
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'); // Separator
                console.log(); // Create blank space between tweets
            }
        }
        else {
            console.log(error); // Log any errors
        }
    });
}

// Spotify setup to return music

var mySpotify = function (song) {
    if (song === undefined) {
        song = "The Sign Ace of Base"; // Use as default song when only user input is a return/enter
    }

    spotify.search({ type: "track", query: song, limit: 5 }, function (error, data) { // Pull 5 songs for the search
        if (error) {
            return console.log("There was an error: " + error);
        }
        else {
            var songs = data.tracks.items;

            for (var i = 0; i < songs.length; i++) {
                var artistName = function (artist) {
                    return artist.name;
                };
                console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'); // Separator
                console.log("Artist: " + songs[i].artists.map(artistName));
                console.log(); // Create blank space in list
                console.log("Song Name: " + songs[i].name);
                console.log(); // Create blank space in list
                console.log("Song Preview: " + songs[i].preview_url);
                console.log(); // Create blank space in list
                console.log("Album: " + songs[i].album.name);
                console.log(); // Create blank space in list
                console.log(); // Create blank space between songs
            }
        }
    });
};

// OMDB setup to return movies 

var myMovies = function (movie) {
    if (movie === undefined) {
        movie = "Mr Nobody"; // Use as default movie when only user input is a return/enter
    }
    var findMovie = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    request(findMovie, function (error, response, text) { // Sets search parameters for the api
        if (error) {
            return console.log("There was an error: " + error);
        }

        if (!error && response.statusCode === 200) {
            var obj = JSON.parse(text);
            console.log(); // Create blank space in list
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'); // Separator
            console.log(); // Create blank space in list
            console.log("Movie Title: " + obj.Title);
            console.log(); // Create blank space in list
            console.log("Year Released: " + obj.Year);
            console.log(); // Create blank space in list
            console.log("IMDB Rating: " + obj.imdbRating);
            console.log(); // Create blank space in list
            console.log("Rotton Tomatoes Rating: " + obj.Ratings[0].Value);
            console.log(); // Create blank space in list
            console.log("Country: " + obj.Country);
            console.log(); // Create blank space in list
            console.log("Language: " + obj.Language);
            console.log(); // Create blank space in list
            console.log("Plot: " + obj.Plot);
            console.log(); // Create blank space in list
            console.log("Actors: " + obj.Actors);
            console.log(); // Create blank space in list
            console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~'); // Separator
        }
    });
};

//Setup for 'Do What It Says' to pull data from random.txt file

var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        if (dataArr.length === 2) {
            select(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            select(dataArr[0]);
        }
    });
};

// Sets function to receive user input and then determien appropriate case function to run from switch
var runCommands = function (argOne, argTwo) {
    select(argOne, argTwo);
};

// Main process to evaluate user input and run requests
runCommands(process.argv[2], process.argv[3]);

// BONUS:  Append tweets to log - not working - 'tweets' isn't the data to append, but can't find the correct data to append - same true for song and movie - may revisit later

fs.appendFile('log.txt', 'tweets', function (error) {
    if (error) throw error;
    console.log('Data Saved');
});

