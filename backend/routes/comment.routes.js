import { Router } from "express";
import {
    getAllComments,
    getCommentById,
    createComment,
    updateCommentById,  
    deleteCommentById,
    getAllCommentFromPost
} from "../controllers/comment.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/", getAllComments);    
router.get("/post/:postId", getAllCommentFromPost);   
      
router.get("/:id", getCommentById);
router.post("/", isAuthenticated, createComment);
router.patch("/:id", isAuthenticated, updateCommentById);
router.delete("/:id", isAuthenticated, deleteCommentById);

export default router;