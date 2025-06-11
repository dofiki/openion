const API_URL = "http://localhost:5000/api/users";
const API_URL_2 = "http://localhost:5000/api/posts/user"

export const fetchUserProfile = async (userId) => {
  return fetch(`${API_URL}/${userId}`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to fetch user profile');
      }
      return res.json();
    })
    .catch((err) => {
      console.error('Error fetching user profile:', err);
      throw err;
    });
}       

export const followUser = async (targetUserId) => {
  try {
    const res = await fetch(`${API_URL}/${targetUserId}/follow`, {
      method: 'POST',
      credentials: 'include', // sends the session cookie
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Follow failed');
    }

    alert(data.message); // or update UI
  } catch (err) {
    console.error('Follow error:', err.message);
    alert(err.message);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const res = await fetch(`${API_URL}/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json', 
      },
    });

    if (!res.ok) {
      throw new Error('Failed to fetch current user');
    }

    return await res.json();
  } catch (err) {
    console.error('Error fetching current user:', err);
    throw err;
  }
};

export const unfollowUser = async (userId)=>{
  const response = await fetch(`${API_URL}/${userId}/unfollow`, {
    method: 'POST',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to unfollow user');
  }
  return response.json();
}

export const getUserPosts = async (userId) => {
  try {
    const res = await fetch(`${API_URL_2}/${userId}`, {
      method: 'GET',
      credentials: 'include', 
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to fetch user posts');
    }

    return await res.json();
  } catch (error) {
    console.error('Error fetching user posts:', error.message);
    throw error;
  }
};