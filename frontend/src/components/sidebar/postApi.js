const API_URL = "http://localhost:5000/api/posts"

export const createPost = async (postData) => {
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(postData),
    credentials: "include"
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to send data");
  }

  return await res.json();
};
