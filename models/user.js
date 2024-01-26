const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        // validate email format
        return /\S+@\S+\.\S+/.test(value);
      },
      message: 'Invalid email format'
    }
  },
  thoughts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thought'
    }
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ]
}, {
  toJSON: {
    virtuals: true,
  },
  id: false
});

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;