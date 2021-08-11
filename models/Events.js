const { Schema, model } = require('mongoose');

const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
// cambiamos la importacion a mayuscula para que no chocque con heroku
//3rd parameter 'Event': as collection name
module.exports = model('Event', EventSchema, 'event');
