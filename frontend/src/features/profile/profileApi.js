const API_URL = "http://localhost:5000/api/users";

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
