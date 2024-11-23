import * as auth from '../api/auth';

import { useLogin } from '../hooks/useLogin';

jest.mock('../api/auth'); // Mock the auth API module

describe('useLogin Hook', () => {
    let setState: jest.Mock;

    beforeEach(() => {
        setState = jest.fn(); // Mock setState
        jest.clearAllMocks();
    });

    it('handles successful login', async () => {
        const mockOnSuccess = jest.fn();
        const mockLogin = jest.spyOn(auth, 'login').mockResolvedValue({ info :"ook", token: 'fake-token' , role: { iv: '123', encryptRole: 'Test Role' } });
        const mockFetchProfile = jest.spyOn(auth, 'fetchProfile').mockResolvedValue({ email: 'test@efrei.fr', name : 'Test', lastname : 'User' });

        const { handleLogin } = useLogin(mockOnSuccess);

        await handleLogin('test@example.com', 'password123');

        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123');
        expect(mockFetchProfile).toHaveBeenCalledWith('fake-token');
        expect(localStorage.getItem('token')).toBe('fake-token');
        expect(localStorage.getItem('userId')).toBe('123');
        expect(localStorage.getItem('userName')).toBe('Test User');
        expect(mockOnSuccess).toHaveBeenCalled();
        expect(setState).toHaveBeenCalledWith(true); // Loading: true at start
        expect(setState).toHaveBeenCalledWith(false); // Loading: false at end
    });

    it('handles login errors', async () => {
        const mockOnSuccess = jest.fn();
        const mockLogin = jest.spyOn(auth, 'login').mockRejectedValue(new Error('Invalid credentials'));

        const { handleLogin } = useLogin(mockOnSuccess);

        await handleLogin('test@example.com', 'wrongpassword');

        expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'wrongpassword');
        expect(setState).toHaveBeenCalledWith(true); // Loading: true at start
        expect(setState).toHaveBeenCalledWith('Invalid credentials'); // Error state
        expect(setState).toHaveBeenCalledWith(false); // Loading: false at end
        expect(mockOnSuccess).not.toHaveBeenCalled();
    });
});
