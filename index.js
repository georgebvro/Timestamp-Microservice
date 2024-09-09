// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', (req, res) => {
  //initialize date with the current date
  let date = new Date();
  //if input date was not empty
  if (req.params.date) {
    //if input is a string of digits, treat it as a number, otherwise as a string
    date = /^\d+$/.test(req.params.date) ? new Date(Number(req.params.date)) : new Date(req.params.date);
  }
  console.log("date.valueOf():", date.valueOf(), "|", date, "|", req.params.date);
  date.valueOf() ? res.json({unix: date.valueOf(), utc: date.toUTCString()}) : res.json({error: "Invalid Date"});
})

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
