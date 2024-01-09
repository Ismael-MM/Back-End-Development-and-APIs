require('dotenv').config();

let express = require('express');
let app = express();
console.log("Hello World");

app.use("/public",express.static(__dirname + "/public"));

app.use(function middleware(req, res, next) {

    var string = req.method + " " + req.path + " - " + req.ip;
    // Do something
    console.log(string);
    // Call the next function in line:
    next();
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

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



 module.exports = app;
