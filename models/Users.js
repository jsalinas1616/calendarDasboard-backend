const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
// cambiamos la importacion a mayuscula para que no chocque con heroku
//3rd parameter 'User': as collection name
module.exports = model('User', UserSchema, 'user');
