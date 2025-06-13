import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-hash -salt');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select('-hash -salt');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      ...user.toObject(),
      followersCount: user.followers.length,
      followingCount: user.following.length
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const followUser = async (req, res) => {
  try {
    const { id: targetId } = req.params;
    const followerId = req.user._id.toString(); 

    if (targetId === followerId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const targetUser = await User.findById(targetId);
    const followerUser = await User.findById(followerId);

    if (!targetUser || !followerUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (targetUser.followers.includes(followerId)) {
      return res.status(400).json({ message: "You already follow this user" });
    }

    targetUser.followers.push(followerId);
    followerUser.following.push(targetId);

    await targetUser.save();
    await followerUser.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const unfollowUser = async (req, res) => {
  try {
    const { id: targetId } = req.params;
    const unfollowerId = req.user._id.toString(); 

    if (targetId === unfollowerId) {
      return res.status(400).json({ message: "You cannot unfollow yourself" });
    }

    const targetUser = await User.findById(targetId);
    const unfollowerUser = await User.findById(unfollowerId);

    if (!targetUser || !unfollowerUser) {
      return res.status(404).json({ message: "User not found!" });
    }

    targetUser.followers.pull(unfollowerId);
    unfollowerUser.following.pull(targetId);

    await targetUser.save();
    await unfollowerUser.save();

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFollowers = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('followers', 'username email');

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ followers: user.followers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getFollowing = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('following', 'username email');

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ following: user.following });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const whoAmI = async (req, res) => {
   if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
   return res.json({ _id: req.user._id });
}
// Example user.controllers.js addition
export const searchUsers = async (req, res) => {
  try {
    const { username } = req.query;
    console.log("Searching for username:", username);
    if (!username) {
      return res.status(400).json({ message: "Username query param is required" });
    }

    // Assuming you have a User model and you want case-insensitive partial match
    const users = await User.find({
      username: { $regex: username, $options: "i" }
    }).select("_id username"); // select only needed fields

    res.json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Server error" });
  }
};
