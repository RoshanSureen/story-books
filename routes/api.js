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
router.get("/:resource/:action/:id", (req, res, next) => {
  var resource = req.params.resource;
  var action = req.params.action;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    if (action === "show") {
      controller
        .getByID({ _id: id })
        .then(story => {
          res.render("stories/show", { story });
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
          res.redirect(`/api/story/show/${story.id}`);
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
router.put("/:resource/:action/:id", (req, res, next) => {
  var resource = req.params.resource;
  var action = req.params.action;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    if (action === "edit") {
      controller
        .edit(id, req.body)
        .then(story => {
          res.redirect("/dashboard");
          return;
        })
        .catch(err => {
          res.json({
            confirmation: "FAIL",
            message: "Could not edit the Story"
          });
          return;
        });
    }
  }
});
router.delete("/:resource/:action/:id", (req, res, next) => {
  var resource = req.params.resource;
  var action = req.params.action;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    if (action === "delete") {
      controller
        .delete({ _id: id })
        .then(story => {
           res.redirect("/dashboard");
        })
        .catch(err => {
          res.json({
            confirmation: "FAIL",
            message: "Could not delete the Story"
          });
          return;
        });
    }
  }
});

module.exports = router;
