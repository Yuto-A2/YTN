const mongoose = require('mongoose');
const { Schema } = mongoose;  

const PostSchema = new Schema(
  {
    supabaseId: {
      type: String,
      unique: true,
      required: true
    },
    profilePicture: {
      type: String,
      default: "",
    },
    scores: [
      {
        quizId: {
          type: String,
          required: true,
        },
        score: {
          type: Number,
          required: true,
          default: 0,
        },
        dateTaken: {
          type: Date,
          default: Date.now,
        },
      },
    ], 
    totalScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", PostSchema);

module.exports = User;
