import axios from 'axios';
import { getCookie } from '../utils/cookie';

// Generic api call variable
const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add the Authorization header with the JWT token from the cookie
const jwtToken = getCookie('jwt_token');
if (jwtToken) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
}

export default apiClient;
