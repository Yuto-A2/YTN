const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    quizId: {
        type: String,
        required: true,
    },
    level: {
        type: String,
    },
    category: {
        type: String,
    },
    question: {
        type: String,
    },
    candidates: {
        type: Array,
        default: [],
    },
    answer: {
        type: String
    }
}, { timestamps: true });

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
