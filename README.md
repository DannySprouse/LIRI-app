# LIRI-app
A LIRI node application

Created application using Node.js

Resources:
Twitter API & Twitter for Node.js NPM package
Spotify API & NPM Node Spotify
OMDB API & Request NPM to pull html data from OMDB
fs Node Package

Primary file:  liri.js

1.  Entering 'my-tweets' in console returns last 20 tweets on the project Twitter account, excluding comments and retweets, and displays the tweet and date/time it was created

2.  Entering 'spotify-this-song' in console will return 'The Sign' by Ace of Base as default, or if the user enters a song name after 'spotify-this-song' will return that song:  returns name of artist, name of song, a song preview link and the album name, and returns a total of 5 songs.

3.  Entering 'movie-this' in console will return 'Mr. Nobody" as default, or if the user enters a movie name after 'movie-this' will return that movie:  returns movie title, year released, IMDB rating, Rotten Tomatoes rating, country, languages, plot and actors.

4.  Entering 'do-what-it-says' in console pulls a song name from the random.txt file and executes a 'spotify-this-song' in console to return information on the song.

Gitignore was used to avoid uploading .env file to protect Twitter and Spotify keys.  