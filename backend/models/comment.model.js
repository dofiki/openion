import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: String,
},{
    timestamps: true
})

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;