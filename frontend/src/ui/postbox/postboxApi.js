const API_URL = "http://localhost:5000/api/posts";

export const likePost = async (postId) => {
  try {
    const res = await fetch(`${API_URL}/${postId}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Return the updated post object to update the UI
    return data.post;

  } catch (error) {
    console.error("Error liking post:", error);
    throw error;
  }
};
