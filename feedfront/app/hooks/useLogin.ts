// hooks/useLogin.ts
import { useState } from 'react';
import { login, fetchProfile } from '../api/auth';

export const useLogin = (onSuccess: () => void) => {
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError('');
        try {
            const { token } = await login(email, password);
            localStorage.setItem('token', token);
            const profile = await fetchProfile(token);
            localStorage.setItem('userId', profile.id);
            localStorage.setItem('userName', profile.username);
            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
};
