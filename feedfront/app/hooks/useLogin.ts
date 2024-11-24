// hooks/useLogin.ts

import { LoginResponse, ProfileResponse, fetchProfile, login } from '../api/auth';

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
            const iv = response.role.iv;
            const encryptRole = response.role.encryptRole;
            localStorage.setItem('token', token);
            localStorage.setItem('iv', iv);
            localStorage.setItem('encryptRole', encryptRole);
            const profile: ProfileResponse = await fetchProfile(token, iv, encryptRole);
            localStorage.setItem('name', profile.name);
            localStorage.setItem('lastname', profile.lastname);
            localStorage.setItem('email', profile.email);
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
