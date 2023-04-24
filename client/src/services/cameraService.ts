import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAllCameras = async (status?: string) => {
  const { data } = await apiClient.get('/cameras', {
    params: status ? { status } : {},
  });
  return data;
};


