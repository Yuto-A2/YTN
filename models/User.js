const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "",
    },
},
{ timestamps: true }
);

module.exports = mongoose.model("User", PostSchema)