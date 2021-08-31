const express = require("express");
const app = express();
require("dotenv/config");
const bp = require("body-parser");
const qr = require("qrcode");
const path = require('path');

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const url = req.body.url;

    if (url.length === 0) res.send("Empty Data!");
    qr.toDataURL(url, (err, src) => {
        if (err) res.send("Error occured");

        res.render("scan", { src });
    });
});
app.use('/css', express.static(path.resolve(__dirname,"assets/CSS")))
app.use('/img', express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))


app.listen(process.env.PORT || 5000  , ()=> {
    console.log("Server at 5000"); 
  });
