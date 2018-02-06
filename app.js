var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
// require passport
var passport = require("passport");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
var methodOverride = require("method-override");

var index = require("./routes/index");
var api = require("./routes/api");
var auth = require("./routes/auth");
// require passport module for your passport.js file
require("./config/passport")(passport);
var keys = require("./config/keys");
var stories = require("./routes/stories");
var { truncate, stripTags, formatDate, select } = require("./helpers/hbs");

var app = express();

// database connection
mongoose.connect(keys.mongoURI, (err, res) => {
  if (err) {
    console.log("DB CONNECTION FAILED: " + err);
  } else {
    console.log("DB CONNECTION SUCCESSFULL: " + keys.mongoURI);
  }
});

// view engine setup
app.engine(".hbs", exphbs({
  helpers: {
    truncate,
    stripTags,
    formatDate,
    select
  },
  defaultLayout: "layout",
  extname: ".hbs"
}));
app.set("view engine", ".hbs");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// method override middleware
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// global varieables
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/api", api);
app.use("/auth", auth);
app.use("/stories", stories);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
