import { useUserProfile } from './useUserProfile';
import * as userService from '../services/userService';

jest.mock('../services/userService');

describe('useUserProfile', () => {
    const mockFetchUserProfile = userService.fetchUserProfile as jest.Mock;

    it('should initialize with default state', () => {
        const initialState = {
            email: '',
            firstName: '',
            lastName: '',
            errorInfo: '',
            loading: true,
        };

        const { email, firstName, lastName, errorInfo, loading } = useUserProfile();
        
        expect(email).toBe(initialState.email);
        expect(firstName).toBe(initialState.firstName);
        expect(lastName).toBe(initialState.lastName);
        expect(errorInfo).toBe(initialState.errorInfo);
        expect(loading).toBe(initialState.loading);
    });

    it('should load user profile data correctly', async () => {
        mockFetchUserProfile.mockResolvedValue({
          name: "",
          content:"",
        });
    });
});

