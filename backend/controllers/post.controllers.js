import Post from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username email");
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate("author", "username email");
        console.log("Found post:", post);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createPost = async (req, res) => {
    try {
        const postData = req.body;
        postData.author = req.user._id; 

        const newPost = new Post(postData);
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updatePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        const updatedPost = await Post.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedPost);  
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        if (!post.author.equals(req.user._id)) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await post.deleteOne();
        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter(uid => uid.toString() !== userId.toString());
        } else {
            post.likes.push(userId);
        }

        await post.save();
        res.status(200).json({
            message: alreadyLiked ? "Post unliked" : "Post liked",
            likesCount: post.likes.length,
            post,
        });
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.find({ author: userId }).populate("author", "username email");
    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error fetching user's posts:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
