import apiClient from './apiClient';

export const getAllCameras = async (status?: string) => {
  const params = status ? { status } : {};
  const { data } = await apiClient.get('/api/cameras', { params });
  return data;
};


