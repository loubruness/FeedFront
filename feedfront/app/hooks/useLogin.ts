// hooks/useLogin.ts

import { LoginResponse, login } from '../api/auth';

import { useState } from 'react';

// Custom hook for handling user login
export const useLogin = (onSuccess: () => void) => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    // Handle user login
    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError('');
        if(email === '' || password === ''){
            setError('Email and password are required');
            setLoading(false);
        }else{
            try {
                const response: LoginResponse = await login(email, password);
                const token = response.token;
                localStorage.setItem('token', token);
                localStorage.setItem('encryptedRole', response.role.encryptedRole);
                localStorage.setItem('iv', response.role.iv);
                onSuccess();
            } catch (err) {
                console.log("error: ", err);
                setError(err instanceof Error ? err.message : 'An error occurred');
            } finally {
                setLoading(false);
            }
        }
    };

    return { handleLogin, loading, error };
};
