// hooks/useLogin.ts

import { LoginResponse, login } from '../api/auth';

import { useState } from 'react';

export const useLogin = (onSuccess: () => void) => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError('');
        try {
            const response: LoginResponse = await login(email, password);
            const token = response.token;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            onSuccess();
        } catch (err) {
            console.log("error: ", err);
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
};
