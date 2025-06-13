const GET_FOLLOWER_API_URL = "http://localhost:5000/api/users"; 

export const getFollowing = async (userId) => {
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

export const getFollowers = async (userId) => {
    try {
        const res = await fetch(`${GET_FOLLOWER_API_URL}/${userId}/followers`, {
            method: "GET",
            credentials: "include"
        });

        if (!res.ok) {
            throw new Error(`Failed to fetch followers: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data.followers; // returning the array directly
    } catch (error) {
        console.error("Error fetching followers:", error);
        return [];
    }
};