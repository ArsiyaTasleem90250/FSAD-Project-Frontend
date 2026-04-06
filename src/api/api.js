const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2020";

// Note: All API calls are disabled - Frontend works with local state only
// Backend integration removed as requested

export const registerUser = async () => {
  // Disabled - using local state instead
  console.log("Frontend-only mode: signup stored locally");
  return { success: true };
};

export const loginUser = async () => {
  // Disabled - using local state instead
  console.log("Frontend-only mode: login handled locally");
  return { success: true };
};

export const verifyOtp = async () => {
  // Disabled - using local state instead
  console.log("Frontend-only mode: OTP verified locally");
  return { success: true };
};

export const resendOtp = async () => {
  // Disabled - using local state instead
  console.log("Frontend-only mode: OTP resent locally");
  return { success: true };
};

export const getSubmissions = async () => {
  // Disabled - using local state instead
  console.log("Frontend-only mode: submissions from local storage");
  return [];
};

export const submitAssignment = async () => {
  // Disabled - using local state instead
  console.log("Frontend-only mode: assignment submitted locally");
  return { success: true };
};

