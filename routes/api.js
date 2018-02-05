var express = require("express");
var router = express.Router();

var Story = require("../models/Story");

router.post("/:resource", (req, res, next) => {
  var resource = req.params.resource;
  let allowComments;
  if (resource === "add") {
    if (req.body.allowComments) {
      allowComments = true;
    } else {
      allowComments = false;
    }
    var newStory = {
      title: req.body.title,
      body: req.body.body,
      status: req.body.status,
      allowComments: allowComments,
      user: req.user.id
    };
    Story.create(newStory, (err, story) => {
      if(err) {
        res.json({
          confirmation: "FAIL",
          message: err
        });
        return;
      } else {
        res.redirect(`/stories/show/${story.id}`);
        return;
      }
    });
    return;
  }
});

module.exports = router;
