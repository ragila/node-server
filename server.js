// server.js
// where your node app starts

// init project
const express = require('express');
const cors = require('cors')
const app = express();
const bodyParser = require('body-parser')


app.use(cors());
app.use(bodyParser.json());

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

//list berita
app.get('/api/berita/', (req, res) => {
  
  db.find({}, function (err, docs) {
    
    res.send(docs)
    
  });

});

//find detail berita
app.get('/api/berita/:slug', (req, res) => {
  
  db.find({slug: req.params.slug}, function (err, docs) {
    
    res.send(docs)
    
  });

});


//insert data
app.post('/api/berita/', (req, res) => {
  
  //?nama=aria
  console.log(req.query);

  const berita = {
    "title": req.body.title,
    "slug": req.body.slug
  }
  
  db.insert(berita, (err, newDoc) => {
    
    if(err){
      res.send('error')
      return;
    }
    
    res.send(newDoc);
    
  });
  
});

// update data
app.put('/api/berita/:slug', (req, res) => {
  
  //?nama=aria
  console.log(req.query);

  const berita = {
    "title": req.query.title,
    "slug": req.query.slug
  }
  
  db.update({ slug: req.params.slug }, berita, {}, function (err, numReplaced) {

    res.send('ok')
  });
  
});


//hapus berita
app.delete('/api/berita/:slug', (req, res) => {
  
  db.remove({ slug: req.params.slug }, {}, function (err, numRemoved) {
    
    res.send('ok');
  });
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

//req 1
//req 2
//req 3
