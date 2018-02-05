var express = require("express");
var router = express.Router();
var { ensureAuthenticated, ensureGuest } = require("../helpers/auth-helper");

router.get("/", (req, res, next) => {
  res.render("stories/public");
});

router.get("/add", ensureAuthenticated, (req, res, next) => {
    res.render("stories/add");
});



module.exports = router;
