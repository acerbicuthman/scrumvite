// utils/nameUtils.js (or inside the same file)
export const splitFullName = (fullName) => {
    const nameParts = fullName.trim().split(" ");
    const first_name = nameParts[0] || "";
    const last_name = nameParts.slice(1).join(" ") || "";
    return { first_name, last_name };
  };
  
  export const combineFullName = (first_name, last_name) => {
    return `${first_name} ${last_name || ""}`.trim();
  };
  