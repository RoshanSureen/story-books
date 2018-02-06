var express = require("express");
var router = express.Router();
var controllers = require("../controllers");

router.get("/:resource/:action", (req, res, next) => {
  var resource = req.params.resource;
  var action = req.params.action;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `RESOURCE ${resource} NOT SUPPORTED`
    });
    return;
  } else {
    if (action === "public") {
      controller
        .get({ status: "public" })
        .then(stories => {
          console.log(stories);
          res.render("stories/public", { stories });
          return;
        })
        .catch(err => {
          res.json({
            confirmation: "FAIL",
            message: err
          });
          return;
        });
    }
  }
});

router.post("/:resource/:action", (req, res, next) => {
  var resource = req.params.resource;
  var action = req.params.action;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `RESOURCE ${resource} NOT SUPPORTED`
    });
    return;
  } else {
    if (action === "add") {
      controller
        .create(req)
        .then(story => {
          res.redirect(`/stories/show/${story.id}`);
          return;
        })
        .catch(err => {
          res.json({
            confirmation: "FAIL",
            message: err
          });
          return;
        });
      return;
    }
  }
});

module.exports = router;
