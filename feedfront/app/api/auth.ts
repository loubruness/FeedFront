// api/auth.ts
export interface LoginResponse {
    info: string;
    token: string;
    role: {
        iv: string;
        encryptRole: string;
    };
}

export interface ProfileResponse {
    info : string;
    result: {
        email: string;
        firstname: string;
        lastname: string;
    };
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            const errorMessage = errorData?.message || 'Failed to login';
            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (err: unknown) {
        console.error('Login API Error:', err);

        if (err instanceof Error) {
            throw new Error(err.message || 'An unexpected error occurred during login');
        } else {
            throw new Error('An unknown error occurred during login');
        }
    }
};

export const fetchProfile = async (token: string): Promise<ProfileResponse> => {
    console.log(token);
    const response = await fetch('http://localhost:3001/profile/getProfileInfos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
};
