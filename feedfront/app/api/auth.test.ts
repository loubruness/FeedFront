import { login, fetchProfile } from "./auth";

global.fetch = jest.fn();

describe("auth.ts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("login", () => {
    it("should return login data on success", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          info: "Logged in",
          token: "abc123",
          role: { iv: "ivValue", encryptedRole: "encryptedRoleValue" },
        }),
      });
      const result = await login("test@test.com", "password");
      expect(result.token).toBe("abc123");
    });

    it("should throw error if status 401", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        json: async () => ({ message: "Invalid email or password" }),
      });
      await expect(login("wrong@test.com", "password")).rejects.toThrow(
        "Invalid email or password"
      );
    });

    it("should throw error if status 500", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: "Internal server error" }),
      });
      await expect(login("test@test.com", "password")).rejects.toThrow(
        "Internal server error"
      );
    });

    it("should throw unexpected error for other statuses", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 403,
        json: async () => ({}),
      });
      await expect(login("test@test.com", "password")).rejects.toThrow(
        "An unexpected error occurred during login"
      );
    });
  });

  describe("fetchProfile", () => {
    it("should return profile data on success", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          info: "Profile info",
          result: {
            email: "test@test.com",
            firstname: "Test",
            lastname: "User",
          },
        }),
      });
      const result = await fetchProfile("validToken");
      expect(result.result.email).toBe("test@test.com");
    });

    it("should throw error if response is not ok", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        text: async () => "Error fetching profile",
      });
      await expect(fetchProfile("invalidToken")).rejects.toThrow(
        "Error fetching profile"
      );
    });
  });
});
