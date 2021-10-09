const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(
  '/public', 
  express.static(__dirname + '/public')
);

app.use(bodyParser.urlencoded({extended: false}));

app.use(
  function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`)

    next();
  }
);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/json', function(req, res) {
  const message = "Hello json";

  if (process.env['MESSAGE_STYLE'] === 'uppercase') {
    res.json({"message": message.toUpperCase()})
  }
  
  res.json({"message": message})
})

app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.send({ time: req.time });
});

app.get('/:word/echo', function(req, res) {
  const { word } = req.params;
  res.send({ echo: word });
});

app
  .route('/name')
  .get(function(req, res) {
    const { first, last } = req.query;
    res.send({ name: `${first} ${last}`});
  })
  .post(function(req, res) {
    const { first, last } = req.body;
    res.send({ name: `${first} ${last}`});
  });




























 module.exports = app;
