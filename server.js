const express = require("express");
// const logger = require("morgan");
// const bodyParser = require("body-parser");

const mongoose = require("mongoose");
// const path = require("path");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
// const axios = require("axios");
// const cheerio = require("cheerio");

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


// Routes
// Setup routes
// const router = express.Router();
require("./config/routes")(app);
require("./config/scrapers")(app);
// app.use(router);


// Setup handlebars
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs( {defaultLayout: "main"} ));
app.set("view engine", "handlebars");



// const routes = require("./routes/route-index.js");
// routes(app,path);
// router.post("/articles/:id", function(req, res) {
//   saveId = req.parms.id;
//   db.Article.update({_id:saveId}, {$set: { saved: true }});
//   res.json(`${saveId} updated`);
// });

// Connect to the Mongo DB
mongoose.set('useCreateIndex', true);
mongoose.connect(db, { useNewUrlParser: true },error => {
  if (error) {
    console.log(error);
  } else {
    console.log("mongodb connection is successful !!"); 
  }
});


const PORT = process.env.PORT || 2608
// Start the server
app.listen(PORT, function() {
  console.log(`App running on port ${PORT} !`);
});