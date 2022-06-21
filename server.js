var express = require("express");
var path = require("path");
var serveStatic = require("serve-static");
const bodyParser = require("body-parser");
const cors = require("cors");
app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, "dist")));
app.use("/:path*", serveStatic(path.join(__dirname, "/dist")));
const api_version = `/start_api/api/v1`;
app.use(api_version, require('./server/api/portal/start_api'));

app.listen(4000,() => console.log(`Server running! 4000`))