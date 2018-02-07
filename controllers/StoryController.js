var mongoose = require("mongoose");
var Story = mongoose.model("stories");
var User = mongoose.model("users");
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
      new Story(newStory)
        .save()
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  },
  addComment: function(id, params) {
    return new Promise((resolve, reject) => {
      Story.findOne({ _id: id }).then(result => {
        const newComment = {
          commentBody: params.body.commentBody,
          commentUser: params.user.id
        };
        // Add to comments Array - unshift() add the comment to begining of the array
        result.comments.unshift(newComment);
        result
          .save()
          .then(story => resolve(story))
          .catch(err => reject(err));
      });
    });
  },
  get: function(params) {
    return new Promise((resolve, reject) => {
      Story.find(params)
        .populate("user")
        .then(stories => resolve(stories))
        .catch(err => reject(err));
    });
  },
  getByID: function(id) {
    return new Promise((resolve, reject) => {
      Story.findOne({ _id: id })
        .populate("user")
        .populate("comments.commentUser")
        .then(story => resolve(story))
        .catch(err => reject(err));
    });
  },
  edit: function(id, params) {
    return new Promise((resolve, reject) => {
      Story.findOne({ _id: id })
        .then(story => {
          let allowComments;

          if (params.allowComments) {
            allowComments = true;
          } else {
            allowComments = false;
          }
          // New values
          story.title = params.title;
          story.body = params.body;
          story.status = params.status;
          story.allowComments = allowComments;

          story
            .save()
            .then(result => resolve(result))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  },
  delete: function(id) {
    return new Promise((resolve, reject) => {
      Story.remove({ _id: id })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
};
