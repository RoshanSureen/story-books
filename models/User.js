var mongoose = require("mongoose");

var UserSchema = mongoose.Schema({
  googleID: { type: String, required: true, default: "" },
  email: { type: String, required: true, default: "" },
  firstName: { type: String, default: "" },
  lastName: { type: String, default: "" },
  image: { type: String, default: "" }
});

module.exports = mongoose.model("UserSchema", UserSchema);
