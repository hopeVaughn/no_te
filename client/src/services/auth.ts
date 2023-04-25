import apiClient from './apiClient';
import { setCookie } from '../utils/cookie';

export const authenticate = async (
  endpoint: string,
  data: Record<string, string>
) => {
  try {
    const response = await apiClient.post(endpoint, data);

    // Set the Authorization header with the token value from the response
    if (response.data.token) {
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
      // Also, save the token to a cookie to persist it across sessions
      setCookie('jwt_token', response.data.token, 7); // Assuming the token should be stored for 7 days
    }

    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Unhandled error: ', error);
  }
};
