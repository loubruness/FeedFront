import { LoginResponse, ProfileResponse, fetchProfile, login } from './auth';

import fetchMock from 'jest-fetch-mock';

describe('Auth API', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    describe('login', () => {
        it('should return a LoginResponse on successful login', async () => {
            const mockResponse: LoginResponse = {
                info: 'Login successful',
                token: 'mockToken123',
                role: {
                    iv: 'mockIv',
                    encryptedRole: 'mockEncryptedRole',
                },
            };

            fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

            const result = await login('test@example.com', 'password123');

            expect(result).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
            });
        });

        it('should throw an error on 401 response', async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify({ message: 'Invalid email or password' }),
                { status: 401 }
            );

            await expect(login('test@example.com', 'wrongPassword')).rejects.toThrow(
                'Invalid email or password'
            );
        });

        it('should throw an error on 500 response', async () => {
            fetchMock.mockResponseOnce(
                JSON.stringify({ message: 'Internal server error' }),
                { status: 500 }
            );

            await expect(login('test@example.com', 'password123')).rejects.toThrow(
                'Internal server error'
            );
        });

        it('should throw a generic error on unexpected response status', async () => {
            fetchMock.mockResponseOnce('', { status: 418 });

            await expect(login('test@example.com', 'password123')).rejects.toThrow(
                'An unexpected error occurred during login'
            );
        });

        it('should handle fetch throwing an unknown error', async () => {
            fetchMock.mockReject(new Error('Network failure'));

            await expect(login('test@example.com', 'password123')).rejects.toThrow(
                'Network failure'
            );
        });
    });

    describe('fetchProfile', () => {
        it('should return a ProfileResponse on successful profile fetch', async () => {
            const mockResponse: ProfileResponse = {
                info: 'Profile fetched successfully',
                result: {
                    email: 'test@example.com',
                    firstname: 'John',
                    lastname: 'Doe',
                },
            };

            fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

            const result = await fetchProfile('mockToken123');

            expect(result).toEqual(mockResponse);
            expect(fetch).toHaveBeenCalledWith('http://localhost:3001/profile/getProfileInfos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer mockToken123`,
                },
            });
        });

        it('should throw an error on failed profile fetch', async () => {
            fetchMock.mockResponseOnce('Unauthorized', { status: 401 });

            await expect(fetchProfile('invalidToken')).rejects.toThrow('Unauthorized');
        });

        it('should handle fetch throwing an unknown error', async () => {
            fetchMock.mockReject(new Error('Network failure'));

            await expect(fetchProfile('mockToken123')).rejects.toThrow('Network failure');
        });
    });
});
