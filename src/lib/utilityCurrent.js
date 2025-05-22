export function parseJwt(token) {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to parse token:", e);
      return null;
    }
  }
  
  export function getCurrentUserId() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.log("No accessToken found in localStorage");
      return null;
    }
  
    const decoded = parseJwt(token);
    if (!decoded) {
      console.log("Failed to decode JWT token");
      return null;
    }
  
    console.log("Decoded JWT payload:", decoded);
    const userId = decoded.email || decoded.sub || decoded.user_id || null;
    if (!userId) {
      console.log("No email, sub, or user_id found in JWT payload");
    }
    return userId;
  }
  
  export function getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    return parseJwt(token);
  }