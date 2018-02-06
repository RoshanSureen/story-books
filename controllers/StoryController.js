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
      Story.findById(id)
        .populate("user")
        .exec((err, result) => {
          if (err) {
            reject(err);
            return;
          } else {
            resolve(result);
            return;
          }
        });
    });
  },
  edit: function(id, params) {
    return new Promise((resolve, reject) => {
      let allowComments;
      if (params.allowComments) {
        allowComments = true;
      } else {
        allowComments = false;
      }
      var editStory = {
        title: params.title,
        body: params.body,
        status: params.status,
        allowComments: allowComments
      };
      Story.findByIdAndUpdate(id, editStory, { new: true }, (err, result) => {
        if (err) {
          reject(err);
          return;
        } else {
          resolve(result);
          return;
        }
      });
    });
  },
  delete: function(id) {
    return new Promise((resolve, reject) => {
      Story.remove(id, (err, result) => {
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
