var express = require('express');
var router = express.Router();
var { ensureAuthenticated, ensureGuest } = require("../helpers/auth-helper");
var controllers = require("../controllers");

/* GET home page. */
router.get('/', ensureGuest, function(req, res, next) {
  res.render('index');
});

router.get("/dashboard", ensureAuthenticated, (req, res, next) => {
  controllers.story.get({ user: req.user.id })
  .then(stories => {
    res.render("dashboard", { stories });
    return;
  })
  .catch(err => {
    res.json({
      confirmation: "FAIL",
      message: err
    });
    return;
  });
});

router.get('/about', function(req, res, next) {
  res.render('about');
});

module.exports = router;
