const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    requite: true,
  },
});
//3rd parameter 'User': as collection name
module.exports = model("User", UserSchema, "user");
