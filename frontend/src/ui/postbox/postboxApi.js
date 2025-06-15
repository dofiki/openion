const API_URL = "http://localhost:5000/api/posts";
const API_URL_2 = "http://localhost:5000/api/comments"

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

export const createComment = async (postId, cmmt) => {
  try {
    const response = await fetch(API_URL_2, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({
        postId,
        text: cmmt,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create comment: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating comment:', error);
    throw error;
  }
};

export const getAllCommentsFromPost = async (postId) => {
  try {
    const res = await fetch(`${API_URL_2}/post/${postId}`,{
      method: "GET",
      credentials: "include"
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch comments: ${res.status}`);
    }
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error('Error fetching comments:', error);
    return []; 
  }
};
