// api.js

// Make sure to use REACT_APP_ prefix for environment variables in React
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

console.log("<><><><><><>",API_BASE_URL); 

// Define API endpoints using the base URL
export const LOGIN_API = `${API_BASE_URL}/login`;
export const REGISTER_API = `${API_BASE_URL}/register`;
export const GET_USER_DETAILS = `${API_BASE_URL}/user`;
export const ACTIVE_QR = `${API_BASE_URL}/activeqr`;
export const UPDATE_USER_DETAILS = `${API_BASE_URL}/update-details`;
export const LOGOUT_API = `${API_BASE_URL}/logout`;
export const CONTACT_US = `${API_BASE_URL}/contact-us`;