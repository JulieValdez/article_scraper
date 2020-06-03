var express = require("express");

var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

//database usage
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoBabish";

var PORT = process.env.PORT || 3000;

// Initialize Express
var app = express();
var router = express.Router();

require("./config/routes")(router);
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.engine("handlebars", expressHandlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(router);

// Connect to the Mongo DB
mongoose.connect(db, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("mongoose connection is successful");
  }
});

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
