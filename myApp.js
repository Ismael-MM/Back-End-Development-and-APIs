require('dotenv').config();
let bodyParser = require("body-parser");

const bodyParser = require('body-parser');
let express = require('express');
let app = express();
console.log("Hello World");

app.use("/public",express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {

    var string = req.method + " " + req.path + " - " + req.ip;

    bodyParser.urlencoded({ extended: false })
    // Do something
    console.log(string);
    // Call the next function in line:
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get(
    "/now",
    (req, res, next) => {
      // adding a new property to req object
      // in the middleware function
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      // accessing the newly added property
      // in the main function
      res.send({time: req.time});
    }
  );

app.get('/json', (req, res) => {

    let msg;
    console.log(process.env.MESSAGE_STYLE);
    if (process.env.MESSAGE_STYLE === "uppercase") {
        msg = "Hello json".toUpperCase();
    } else {
        msg = "Hello json";
    }

    res.json({"message": msg});
})


app.get('/:word/echo', (req, res) => {
  res.json({"echo": req.params.word});
})

app.get('/name', (req, res) => {
  res.json({"name": `${req.query.first} ${req.query.last}`});
})


 module.exports = app;
