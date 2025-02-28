require('dotenv').config();

const express = require('express');
const hbs = require('hbs');

const  SpotifyWebApi  =  require ( 'spotify-web-api-node' ) ;

const app = express();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  
  // Retrieve an access token
  spotifyApi
    .clientCredentialsGrant()
    .then(data => spotifyApi.setAccessToken(data.body['access_token']))
    .catch(error => console.log('Something went wrong when retrieving an access token', error));
  
    
    

// Our routes go here:

app.get('/',(req, res)=>{
  res.render('home')
})



app.get('/artist-search-results', (req, res)=>{
  //console.log(req.query.artistName)
  const {artistName} = req.query
   spotifyApi
  .searchArtists(artistName)
  .then(data => {
    console.log('The received data from the API: ', data.body);
     'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
     //res.render('artist-search-results');
     res.render('artist-search-results',{data: data.body.artist.items});
  })
  .catch((err) => console.log('The error while searching artists occurred: ', error));
  
   
});

app.get('/albums/:artistsId', (req, res, next) => {
  spotifyApi
   .getArtistAlbums(req.params.artistsId) 
   .then(data=>{
     res.render('albums',{data: data.body.artists.items});
   })
});

app.get('/albums/:albumId', (req, res, next) => {
  spotifyApi
   .getAlbumTraks(req.params.albumId) 
   .then(data=>{
     res.render('traks', data.body);

   })
  });

   app.listen(3000, () => console.log('My Spotify project running on port 3000 🎧 🥁 🎸 🔊'));

