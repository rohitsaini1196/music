(function() {
  "use strict";

  var express = require("express");
  var path = require("path");
  var logger = require("morgan");
  var cookieParser = require("cookie-parser");
  var bodyParser = require("body-parser");
  var routes = require("./routes.js");

  var app = express();
  var publicPath = path.resolve(__dirname, "../dist");
  var port = 3000;

  // point for static assets
  app.use(express.static(publicPath));

  //view engine setup
  app.set("views", path.join(__dirname, "../dist"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");

  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use("/", routes);

  app.use(cookieParser());

  var server = app.listen(port, function() {
    console.log("Express server listening on port " + server.address().port);
  });

  module.exports = app;
})();
