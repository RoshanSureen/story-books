var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

router.get("/:action", (req, res, next) => {
  var action = req.params.action;
  if (action === "logout") {
    req.logout();
    res.redirect("/");
  } else if (action === "verify") {
    if (req.user) {
      res.json({
        confirmation: "SUCCESS",
        result: req.user
      });
      return;
    } else {
      res.json({
        confirmation: "FAIL",
        message: "Not Auth"
      });
      return;
    }
  } else {
    res.json({
      confirmation: "FAIL",
      message: `action ${action} not supported`
    });
    return;
  }
});

module.exports = router;
