var express = require('express');
var app = express();

app.use(
  function (req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`)

    next();
  }
);

app.use(
  '/public', 
  express.static(__dirname + '/public')
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
































 module.exports = app;
