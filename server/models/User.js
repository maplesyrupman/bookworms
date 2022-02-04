const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
      match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
      type: String,
      required: true,
      minlength: 5
    },

    bio: {
      type: String,
      maxlength: 580
    },

    favBookTitle: {
      type: String
    },

    favBookDescription: {
      type: String
    },

    favBookAuthors: {
      type: String
    },

    favBooImgUrl: {
      type: String
    },

    favBookId: {
      type: String
    },

    bookClubs: [
      {
        type: Schema.Types.ObjectId,
        ref: 'BookClub'
      }
    ]
  },
  {
    toJSON: {
      getters: true
    }
  },
  {
    collection: 'users',
  }
);

// set up pre-save middleware to create password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});


// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};


const User = model('User', userSchema);

module.exports = User;
