import { login, fetchProfile } from './auth';

global.fetch = jest.fn();

describe('Auth API', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('login should send correct POST request and handle response', async () => {
        const mockResponse = { token: 'mockToken' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockResponse,
        });

        const result = await login('test@example.com', 'password123');
        expect(fetch).toHaveBeenCalledWith('/api/login', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'test@example.com', password: 'password123' }),
        }));
        expect(result).toEqual(mockResponse);
    });

    test('fetchProfile should send correct POST request and handle response', async () => {
        const mockProfile = { id: '123', username: 'TestUser' };
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => mockProfile,
        });

        const result = await fetchProfile('mockToken');
        expect(fetch).toHaveBeenCalledWith('/api/profile_page', expect.objectContaining({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: 'mockToken' }),
        }));
        expect(result).toEqual(mockProfile);
    });

    test('login should throw error for failed response', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            text: async () => 'Unauthorized',
        });

        await expect(login('test@example.com', 'wrongpassword')).rejects.toThrow('Unauthorized');
    });
});
