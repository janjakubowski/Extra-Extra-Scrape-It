const express = require("express");
// const logger = require("morgan");
const expressHandlebars = require("express-handlebars");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
// const path = require("path");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db =   process.env.MOGODB_URI || "mongodb://localhost/extraExtraFinancials";

// Initialize Express
const app = express();

// Configure middleware
app.use(express.static(__dirname + "/public"));

// Use morgan logger for logging requests
// app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Setup handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes
// Setup routes
const router = express.Router();
require("./config/routes")(router);
app.use(router);

// const routes = require("./routes/route-index.js");
// routes(app,path);

// Connect to the Mongo DB
mongoose.connect(db, { useNewUrlParser: true }, error => {
  if (error) {
    console.log(error);
  } else {
    console.log("mongodb connection is successful !!"); 
  }
});


const PORT = process.env.PORT || 5000
// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT} !`);
});