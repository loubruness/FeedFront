import { renderHook, act } from "@testing-library/react";
import { useLogin } from "./useLogin";
import * as auth from "../api/auth";

jest.mock("../api/auth");

describe("useLogin", () => {
  const mockLogin = auth.login as jest.Mock;
  const onSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with default state", () => {
    const { result } = renderHook(() => useLogin(onSuccess));

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should set error if email or password is empty", async () => {
    const { result } = renderHook(() => useLogin(onSuccess));

    await act(async () => {
      await result.current.handleLogin("", "");
    });

    expect(result.current.error).toBe("Email and password are required");
    expect(result.current.loading).toBe(false);
  });

  it("should call login and set token on success", async () => {
    const mockResponse = {
      token: "test-token",
      role: { iv: "ivValue", encryptedRole: "encryptedRoleValue" },
    };
    mockLogin.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useLogin(onSuccess));

    await act(async () => {
      await result.current.handleLogin("test@example.com", "password");
    });

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password");
    expect(localStorage.getItem("token")).toBe("test-token");
    expect(localStorage.getItem("encryptedRole")).toBe("encryptedRoleValue");
    expect(localStorage.getItem("iv")).toBe("ivValue");
    expect(onSuccess).toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("");
  });

  it("should set error on login failure", async () => {
    mockLogin.mockRejectedValue(new Error("Invalid email or password"));

    const { result } = renderHook(() => useLogin(onSuccess));

    await act(async () => {
      await result.current.handleLogin("test@example.com", "wrongpassword");
    });

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "wrongpassword");
    expect(result.current.error).toBe("Invalid email or password");
    expect(result.current.loading).toBe(false);
  });

  it("should handle unexpected errors", async () => {
    mockLogin.mockRejectedValue("Unexpected error");

    const { result } = renderHook(() => useLogin(onSuccess));

    await act(async () => {
      await result.current.handleLogin("test@example.com", "password");
    });

    expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password");
    expect(result.current.error).toBe("An error occurred");
    expect(result.current.loading).toBe(false);
  });
});
