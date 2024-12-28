require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
let bodyParser = require('body-parser')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});
app.use((bodyParser.urlencoded({extended: true})))
app.use(bodyParser.json())
let urlDb = {}

app.post('/api/shorturl', (req,res) => {

  let fullUrl = req.body.url
  
  let test = /^http/.test(fullUrl) 
  if(!test){
    res.json({error: "invalid url"})
  }
  else{
   let shorten_url = Math.floor(Math.random() * 1000000) 
   urlDb[shorten_url] = fullUrl
    res.json({original_url: fullUrl, short_url: shorten_url})
  }
})
 app.get('/api/shorturl/:short_url', (req,res) => {
  const { short_url } = req.params
  let retrieveUrl = urlDb[short_url]
  if(retrieveUrl){
    res.redirect(retrieveUrl)
  }else{
    res.json({error: 'sorry nothing stored'})
  }

})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
