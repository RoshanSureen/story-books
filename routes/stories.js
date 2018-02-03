var express = require("express");
var router = express.Router();
var { ensureAuthenticated, ensureGuest } = require("../helpers/auth-helper");

router.get("/", (req, res, next) => {
  res.render("stories/public");
});

router.get("/:story", ensureAuthenticated, (req, res, next) => {
  var story = req.params.story;
  console.log(story);
  if (story === "add") {
    res.render("stories/add");
  } else {
    res.json({
      confirmation: "FAIL",
      message: `Route ${story} not supported`
    });
    return;
  }
});

module.exports = router;
