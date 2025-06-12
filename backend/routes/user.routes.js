import { Router } from "express";
import {
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
    followUser,
    unfollowUser,
    getFollowers,
    getFollowing,
    whoAmI,
    searchUsers
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = Router();

router.get("/", getAllUsers);
router.get("/search", searchUsers);
router.get("/me",isAuthenticated, whoAmI)

router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);
router.post("/:id/follow", isAuthenticated, followUser);
router.post("/:id/unfollow", isAuthenticated, unfollowUser);

router.get("/:id", getUserById);
router.patch("/:id", isAuthenticated, updateUserById);
router.delete("/:id", isAuthenticated, deleteUserById);

export default router;
