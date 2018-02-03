var express = require('express');
var router = express.Router();
var { ensureAuthenticated, ensureGuest } = require("../helpers/auth-helper");

/* GET home page. */
router.get('/', ensureGuest, function(req, res, next) {
  res.render('index');
});

router.get("/dashboard", ensureAuthenticated, (req, res, next) => {
  res.render("dashboard");
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
