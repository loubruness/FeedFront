import { ProfileResponse, fetchProfile } from '@/api/auth';
import { useEffect, useState } from 'react';

// import { fetchUserProfile } from '../services/userService';

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
            console.log(token);
            if (!token) {
                throw new Error('No token found');
            }
            const data : ProfileResponse = await fetchProfile(token);
            const info = data.result;
            console.log(data);
            setEmail(info.email);
            setFirstName(info.firstname);
            setLastName(info.lastname);
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
    
    console.log(email);
    return { email, firstName, lastName, errorInfo, loading };
};
