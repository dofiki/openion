const API_URL = "http://localhost:5000/api/users"

export const searchUserByUsername = async (username) => {
  try {
    const res = await fetch(`${API_URL}/search?username=${encodeURIComponent(username)}`, {
      method: 'GET',
      credentials: 'include'
    });

    if (!res.ok) throw new Error('Failed to search user');

    const data = await res.json();
    return data.users; // assuming backend returns { users: [...] }
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};
