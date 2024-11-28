import { ProfileResponse, fetchProfile } from '@/api/auth';
import { useEffect, useState } from 'react';

export const useUserProfile = () => {
    // State variables
    const [email, setEmail] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [errorInfo, setErrorInfo] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    // Load user profile data
    const loadUserData = async () => {
        setErrorInfo('');
        setLoading(true);

        // Fetch user profile data
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

    // Load user profile data on component mount
    useEffect(() => {
        loadUserData();
    }, []);
    
    console.log(email);
    return { email, firstName, lastName, errorInfo, loading };
};
