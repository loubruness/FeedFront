import { useUserProfile } from "./useUserProfile";
import * as userService from "../services/userService";
import { renderHook } from "@testing-library/react";

jest.mock("../services/userService");

// Mock the fetchUserProfile function
describe("useUserProfile", () => {
  const mockFetchUserProfile = userService.fetchUserProfile as jest.Mock;

  beforeEach(() => {
    mockFetchUserProfile.mockReset();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useUserProfile());

    expect(result.current).toEqual({
      email: "",
      firstName: "",
      lastName: "",
      errorInfo: "No token found",
      loading: false,
    });
  });

  // Test the loadUserData function
  it("should load user profile data correctly", async () => {
    mockFetchUserProfile.mockResolvedValue({
      name: "",
      content: "",
    });
  });
});
