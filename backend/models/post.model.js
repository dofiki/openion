import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content:String,
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},{
    timestamps: true
})

const Post = mongoose.model('Post', PostSchema)

export default Post;