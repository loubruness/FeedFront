// api/auth.ts
export interface LoginResponse {
    info: string;
    token: string;
    role: {
        iv: string;
        encryptedRole: string;
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
        const response = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_ADDRESS}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            if(response.status === 401) {
                const errorMessage = errorData?.message || 'Invalid email or password';
                throw new Error(errorMessage);
            }else if(response.status === 500) {
                const errorMessage = errorData?.message || 'An internal server error occurred during login';
                throw new Error(errorMessage);
            }else{
                throw new Error('An unexpected error occurred during login');
            }
        }

        const data = await response.json();
        return data as LoginResponse;
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
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_BACK_ADDRESS}/profile/getProfileInfos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
         },
    });
    if (!response.ok) throw new Error(await response.text());
    return response.json();
};
