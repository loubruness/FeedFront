import { fetchUserProfile } from './userService';

describe('fetchUserProfile', () => {
    const mockToken = 'test-token';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return user profile data on success', async () => {
        const mockResponse = { email: 'test@example.com', firstName: 'John', lastName: 'Doe' };

        // Mock the fetch function
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockResponse),
            } as Response)
        );

        const data = await fetchUserProfile(mockToken);

        expect(fetch).toHaveBeenCalledWith('/api/profile_page', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: mockToken }),
        });
        expect(data).toEqual(mockResponse);
    });

    it('should throw an error if token is missing', async () => {
        await expect(fetchUserProfile(null)).rejects.toThrow('No token provided');
    });

    it('should throw an error if the API response is not OK', async () => {
        const mockErrorMessage = 'Failed to load profile data';

        // Mock a failed API response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: mockErrorMessage }),
            } as Response)
        );

        await expect(fetchUserProfile(mockToken)).rejects.toThrow(mockErrorMessage);
    });

    it('should throw a generic error if no error message is provided', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({}),
            } as Response)
        );

        await expect(fetchUserProfile(mockToken)).rejects.toThrow('Failed to load profile data');
    });
});
