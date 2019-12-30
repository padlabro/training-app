const path = require("path");
const express = require("express");

const app = express();

app.use(express.static(path.join(__dirname, "/dist")));

app.get("/*", function(req, res) {
  res.sendfile("index.html", { root: path.join(__dirname, "/dist") });
});

app.listen(8000, function() {
  console.log("App is running at localhost: 8000");
});
