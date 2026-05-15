"use strict";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const routes = require("./routes");

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "templates"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

app.get("/", function(request, response) {
   response.render("index");
});

app.use("/spots", routes);
app.listen(process.env.PORT || 3000);
