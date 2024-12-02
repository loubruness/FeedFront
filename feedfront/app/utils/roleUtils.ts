export const getUserRole = (): "admin" | "student" | "teacher" => {
    // logic to determine user role (e.g., from localStorage, API, or context)
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    // return user.role || "student";
    return "teacher";
  };
  