const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        questions: {
            type: [
                {
                    questionId: {
                        type: String,
                        required: true,
                    },
                    question: {
                        type: String,
                        required: true,
                    },
                    candidates: {
                        type: [String],
                        required: true,
                    },
                    answer: {
                        type: String,
                        required: true,
                    },
                },
            ],
            default: [],
        },
        completed: {  
            type: Boolean,
            default: false, 
        },
        score: {  
            type: Number,
            default: 0, 
        },
    },
    { timestamps: true } 
);

const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
