var Story = require("../models/Story");
var Promise = require("bluebird");

module.exports = {
  create: function(params) {
    return new Promise((resolve, reject) => {
      let allowComments;
      if (params.body.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }
      var newStory = {
        title: params.body.title,
        body: params.body.body,
        status: params.body.status,
        allowComments: allowComments,
        user: params.user.id
      };
      Story.create(newStory, (err, result) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(result);
          return;
        }
      });
    });
  }
};
