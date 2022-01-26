const { Schema, model, Types } = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema(
  {
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
      validate: [isEmail, 'invalid email']
    },
    thoughts: [
      {
        type: Types.ObjectId,
        ref: 'thought',
      },
    ],
    friends: [
      {
        type: Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema
  .virtual('friendCount')
  .get(function () {
    return this.friends.length;
  })

const User = model('user', userSchema);

module.exports = User;