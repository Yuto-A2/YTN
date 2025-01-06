const mongoose = require('mongoose');
const { Schema } = mongoose;  // Schemaをmongooseからインポート

// PostSchemaを定義
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
        },
        dateTaken: {
          type: Date,
          default: Date.now,
        },
      },
    ], // scores を直接スキーマの一部として定義
    totalScore: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// すでにモデルが存在する場合は再定義しない
const User = mongoose.models.User || mongoose.model("User", PostSchema);

module.exports = User;
