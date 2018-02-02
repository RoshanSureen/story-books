var express = require("express");
var router = express.Router();

router.get("/:resource", (req, res, next) => {
  var resource = req.params.resource;
  if(resource === "profile") {
    res.json({
      confirmation: "SUCCESS",
      message: "It worked!"
    });
    return;
  }
});

module.exports = router;