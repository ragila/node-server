// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors')
const app = express();


app.use(cors);

// bikin database
const Datastore = require('nedb');
const db = new Datastore({ filename: '.data/db.json', autoload: true });

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
// app.use(express.static('public'));
const listBerita = [
  {
    "title": "Apa Tujuan Grab Bangun Laboratorium AI bersama NUS?",
    "slug": "laboratorium-ai-grab-nus"
  },
  {
    "title": "8 <em>Startup</em> Tahap Awal yang Bergabung dengan Program Akselerator Digitaraya",
    "slug": "startup-peserta-akselerator-digitaraya"
  },
  {
    "title": "Sejarah Perkembangan Aplikasi <em>Instant Messaging</em> di Seluruh Dunia",
    "slug": "sejarah-aplikasi-chatting",
  }
]

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  
  //proses 
  response.send('ok')
});

app.get('/api/berita/', (req, res) => {
  
  db.find({}, function (err, docs) {
    
    res.send(docs)
    
  });

});

app.post('/api/berita/', (req, res) => {
  
  const berita = {
    "title": "Apa Tujuan Grab Bangun Laboratorium AI bersama NUS?",
    "slug": "laboratorium-ai-grab-nus"
  }
  
  db.insert(berita, (err, newDoc) => {
    
    if(err){
      res.send('error')
      return;
    }
    
    res.send(newDoc);
    
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//req 1
//req 2
//req 3
