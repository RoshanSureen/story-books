var express = require("express");
var router = express.Router();
var { ensureAuthenticated, ensureGuest } = require("../helpers/auth-helper");
var controllers = require("../controllers");

// Add form
router.get("/:resource/add", ensureAuthenticated, (req, res, next) => {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `RESOURCE ${resource} NOT SUPPORTED`
    });
    return;
  } else {
    res.render("stories/add");
    return;
  }
});
// Edit form
router.get("/:resource/edit/:id", ensureAuthenticated, (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `RESOURCE ${resource} NOT SUPPORTED`
    });
    return;
  } else {
    controller
      .getByID(id)
      .then(story => {
        res.render("stories/edit", { story });
      })
      .catch(err => {
        res.json({
          confirmation: "FAIL",
          message: err
        });
        return;
      });
  }
});
// Show public stories
router.get("/:resource/public", (req, res, next) => {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `RESOURCE ${resource} NOT SUPPORTED`
    });
    return;
  } else {
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
});
// Show single story
router.get("/:resource/show/:id", (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    controller
      .getByID(id)
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
});
// Save a story to database
router.post("/:resource/save", (req, res, next) => {
  var resource = req.params.resource;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `RESOURCE ${resource} NOT SUPPORTED`
    });
    return;
  } else {
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
  }
});
// Add a comment
router.post("/:resource/comment/:id", (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    controller
      .addComment(id, req)
      .then(story => {
        res.redirect(`/api/story/show/${story.id}`);
        return;
      })
      .catch(err => {
        res.json({
          confirmation: "FAIL",
          message: "Comment could not be added"
        });
        return;
      });
  }
});
// Update a story
router.put("/:resource/update/:id", (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    controller
      .edit(id, req.body)
      .then(story => {
        res.redirect("/dashboard");
        return;
      })
      .catch(err => {
        res.json({
          confirmation: "FAIL",
          message: "Could not update the Story"
        });
        return;
      });
  }
});
// delete a story
router.delete("/:resource/delete/:id", (req, res, next) => {
  var resource = req.params.resource;
  var id = req.params.id;
  var controller = controllers[resource];
  if (controller === null) {
    res.json({
      confirmation: "FAIL",
      message: `Resource ${resource} not supported`
    });
    return;
  } else {
    controller
      .delete(id)
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
});

module.exports = router;
