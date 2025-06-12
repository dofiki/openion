const GET_FOLLOWER_API_URL = "http://localhost:5000/api/users"; 
const USER_POST_API_URL = "http://localhost:5000/api/posts/user"; 

const getFollowing = async (userId) => {
    try {
        const res = await fetch(`${GET_FOLLOWER_API_URL}/${userId}/following`, {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch followers: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.following; // returning the array directly
    } catch (error) {
        console.error("Error fetching followers:", error);
        return [];
    }
};

const getFollowersPost = async (followingId) => {
    try {
        const res = await fetch(`${USER_POST_API_URL}/${followingId}`, {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data; // assuming API returns array of posts
    } catch (error) {
        console.error("Error fetching follower's posts:", error);
        return [];
    }
};

export const getFeed = async (userId) => {
  try {
    const following = await getFollowing(userId);

    // Fetch all followers' posts in parallel
    const postsArray = await Promise.all(
      following.map(async (fo) => {
        const posts = await getFollowersPost(fo._id);
        // Return only the latest post for this follower (if any)
        if (posts.length > 0) {
          // Sort follower's posts by createdAt descending, take first (latest)
          posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          return posts[0];
        }
        return null; // No posts for this follower
      })
    );

    // Filter out any nulls (followers with no posts)
    const latestPosts = postsArray.filter(post => post !== null);

    // Sort all latest posts by createdAt descending (newest first)
    latestPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return latestPosts;

  } catch (error) {
    console.error("Error fetching feed:", error);
    return [];
  }
};
