require('dotenv').config();

let express = require('express');
let app = express();
console.log("Hello World");

app.use("/public",express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
})

app.get('/json', (req, res) => {

    let msg = "Hello json";

    if (process.env.MESSAGE_STYLE == "uppercase") {
        msg.toUpperCase;
    } else {
        msg.toLowerCase;
    }

    res.json({"message": msg});
})



 module.exports = app;
