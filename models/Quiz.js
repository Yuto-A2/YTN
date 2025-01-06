const mongoose = require("mongoose");

// 既存のモデルを削除
delete mongoose.models.Quiz;

// 新しいスキーマの定義
const QuizSchema = new mongoose.Schema(
    {
        level: {
            type: String,
            required: true,
        },
        category: {  
            name: { type: String, default: "" },
            link: { type: String, default: "" },
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

// 新しいスキーマを使ってモデルを作成
const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
