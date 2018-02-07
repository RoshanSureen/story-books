var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var exphbs = require("express-handlebars");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");

// Load Models
require("./models/User");
require("./models/Story");

// Passport config
require("./config/passport")(passport);

var index = require("./routes/index");
var auth = require("./routes/auth");
var api = require("./routes/api");

// Load keys
var keys = require("./config/keys");
var { truncate, stripTags, formatDate, select } = require("./helpers/hbs");

// Map global promises
mongoose.Promise = global.Promise;
// database connection
mongoose.connect(keys.mongoURI, (err, res) => {
  if (err) {
    console.log("DB CONNECTION FAILED: " + err);
  } else {
    console.log("DB CONNECTION SUCCESSFULL: " + keys.mongoURI);
  }
});

var app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// method override middleware
app.use(methodOverride("_method"));

// view engine setup
app.engine(
  ".hbs",
  exphbs({
    helpers: {
      truncate,
      stripTags,
      formatDate,
      select
    },
    defaultLayout: "layout",
    extname: ".hbs"
  })
);
app.set("view engine", ".hbs");

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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/api", api);
app.use("/auth", auth);

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
