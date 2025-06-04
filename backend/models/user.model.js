import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: String,
  hash: {
  type: String,
  select: false,
  },
  salt: {
  type: String,
  select: false,
  },
  email: String,
  bio: String,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true 
});

const User = mongoose.model('User', UserSchema)

export default User;