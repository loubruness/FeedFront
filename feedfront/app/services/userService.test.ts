import { fetchUserProfile } from "./userService";

describe("fetchUserProfile", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
    jest.clearAllMocks();
  });

  it("should throw an error if no token is provided", async () => {
    await expect(fetchUserProfile(null)).rejects.toThrow("No token provided");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should return JSON data when response is ok", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ email: "test@example.com" }),
    });
    const result = await fetchUserProfile("validToken");
    expect(result.email).toBe("test@example.com");
  });

  it("should throw an error with the response message if fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Profile error" }),
    });
    await expect(fetchUserProfile("invalidToken")).rejects.toThrow(
      "Profile error"
    );
  });

  it("should throw a default error if no message is provided in the response", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({}),
    });
    await expect(fetchUserProfile("anyToken")).rejects.toThrow(
      "Failed to load profile data"
    );
  });
});
