export const fetchUserProfile = async (token: string | null) => {
    // Fetch user profile data
    if (!token) {
        throw new Error("No token provided");
    }

    // Fetch user profile data
    const response = await fetch('/api/profile_page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
    });

    // Handle errors
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to load profile data');
    }

    return response.json();
};
