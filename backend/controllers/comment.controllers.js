import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";

export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate("author post");
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching all comments:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;

        const comment = await Comment.findById(id)
            .populate({
                path: "author",
                select: "username email" 
            })
            .populate({
                path: "post",
                populate: {
                    path: "author",
                    select: "username email" 
                }
            });

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        console.error("Error fetching comment by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createComment = async (req, res) => {
  try {
    const { postId, text } = req.body;
    const userId = req.user._id; // Assuming you're using middleware to get authenticated user

    const newComment = new Comment({
      post: postId,
      author: userId,
      text,
    });

    await newComment.save();

    // 🔥 Populate author details before sending
    const populatedComment = await Comment.findById(newComment._id).populate("author", "username avatar");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        const updateData = req.body;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check ownership
        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to update this comment" });
        }

        // Update comment fields
        Object.assign(comment, updateData);

        const updatedComment = await comment.save();

        res.status(200).json(updatedComment);
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const comment = await Comment.findById(id);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check ownership
        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this comment" });
        }

        await comment.deleteOne();

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getAllCommentFromPost = async (req, res) => {
    try {
        const { postId } = req.params; // id = postId

        const comments = await Comment.find({ post: postId })
            .sort({ createdAt: -1 }) // latest comments first (optional)
            .populate("author", "username avatar"); // assuming user field

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments for post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
