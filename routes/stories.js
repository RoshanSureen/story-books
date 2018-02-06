var express = require("express");
var router = express.Router();
var { ensureAuthenticated, ensureGuest } = require("../helpers/auth-helper");
var controllers = require("../controllers");

router.get("/add", ensureAuthenticated, (req, res, next) => {
    res.render("stories/add");
});

router.get("/edit/:id", ensureAuthenticated, (req, res, next) => {
  var id = req.params.id;
  controllers.story.getByID(id)
    .then(story => {
      res.render("stories/edit", { story })
    })
    .catch(err => {
      res.json({
        confirmation: "FAIL",
        message: err
      });
      return;
    });
});



module.exports = router;
