var mongoose = require("mongoose");

var StorySchema = mongoose.Schema({
  title: { type: String, required: true, default: "" },
  body: { type: String, required: true, default: "" },
  status: { type: String, default: "public" },
  allowComments: { type: Boolean, default: true },
  comments: {
    type: [
      {
        commentBody: { type: String, required: true, default: "" },
        commentDate: { type: Date, default: Date.now },
        commentUser: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchema" }
      }
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserSchema"
    },
    date: {
      type: Date, default: Date.now
    },
    required: true,
    default: ""
  }
});

module.exports = mongoose.model("StorySchema", StorySchema);
