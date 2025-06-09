const API_URL = "http://localhost:5000/api/users";

// updating profile
export const pushUpdate = async (data, userId) => {
  return fetch(`${API_URL}/${userId}`, {
    method: 'PATCH',  
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to update user profile');
      }
      return res.json();
    })
    .catch((err) => {
      console.error('Error updating user profile:', err);
      throw err;
    });
};

// loggin out 
export const logOut = async () => {
  const response = await fetch('http://localhost:5000/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Logout failed');
  }

  return response.json();
};
