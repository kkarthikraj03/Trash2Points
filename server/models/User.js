import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    points: {
      type: Number,
      default: 0
    }
    // Other user-related fields like name, email, etc.
  });

const User = mongoose.model('User', userSchema);

export default User; 
