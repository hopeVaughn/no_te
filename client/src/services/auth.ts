import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Get the JWT token from the cookies using document.cookie
const token = document.cookie
  .split('; ')
  .find(row => row.startsWith('token='))
  ?.split('=')[1];

// Add the Authorization header to the apiClient instance if the token is defined
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export const authenticate = async (
  endpoint: string,
  data: Record<string, string>
) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Unhandled error: ', error);
  }
};