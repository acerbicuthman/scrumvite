// lib/utilityCurrent.js

// Parses a JWT without any dependencies
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
      console.error("Failed to parse JWT token:", e);
      return null;
    }
  }
  
  // Extracts the current user ID from the token
  export function getCurrentUserId() {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.warn("No accessToken found in localStorage");
      return null;
    }
  
    const decoded = parseJwt(token);
    if (!decoded) {
      console.warn("Failed to decode JWT token");
      return null;
    }
  
    const userId = decoded.email || decoded.sub || decoded.user_id || decoded.username || null;
    if (!userId) {
      console.warn("No identifiable user ID found in JWT payload");
    }
  
    return userId;
  }
  
  // Gets the full decoded user object from JWT
  export function getCurrentUser() {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    return parseJwt(token);
  }
  
  // Optionally, expose an easy way to get user email from the token
  export function getCurrentUserEmail() {
    const user = getCurrentUser();
    return user?.email || user?.username || null;
  }
  