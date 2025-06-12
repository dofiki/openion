const API_URL = "http://localhost:5000/auth";

export async function login({ username, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
    credentials: "include"
  });

  if (!res.ok) throw new Error((await res.json()).message || "Login failed");

  return await res.json();
}

export async function register({ username, email, password }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password, bio: "" }), 
    credentials: "include"
  });

  if (!res.ok) throw new Error((await res.json()).message || "Registration failed");

  return await res.json();
}

