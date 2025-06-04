import { Router } from "express";
import {
    getAllPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById,
    likePost,
    getUserPosts
} from "../controllers/post.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/user/:userId", getUserPosts); 
router.get("/:id", getPostById);
router.post("/", isAuthenticated, createPost);
router.patch("/:id", isAuthenticated, updatePostById);
router.delete("/:id", isAuthenticated, deletePostById);
router.post("/:id/like", isAuthenticated, likePost);

export default router;
