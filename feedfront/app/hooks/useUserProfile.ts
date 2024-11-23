import { useEffect, useState } from 'react';
import { fetchUserProfile } from '../services/userService';

export const useUserProfile = () => {
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [errorInfo, setErrorInfo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const loadUserData = async () => {
        setErrorInfo('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const data = await fetchUserProfile(token);
            setEmail(data.email);
            setFirstName(data.firstName);
            setLastName(data.lastName);
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorInfo(error.message);
            } else {
                console.error('Unknown error:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUserData();
    }, []);

    return { email, firstName, lastName, errorInfo, loading };
};
