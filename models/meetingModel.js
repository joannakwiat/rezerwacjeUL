const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: [true, 'Meeting must have a date']
    },
    place: {
      type: String,
      required: [true, 'Meeting must have a place']
    },
    info: String,
    confirm: { type: Boolean, default: false },
    limit: Number,
    users: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    meetingCreator: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Meeting must have a creator']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

meetingSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'meetingCreator'
  });
  this.populate('users');
  next();
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
