const express = require("express");
const path = require("path");
const app = express();

const scrapeCNBC = require("./routes/scrape-cnbc.js");
scrapeCNBC(app, path);

const scrapeFBN = require("./routes/scrape-fbn.js");
scrapeFBN(app, path);