import apiClient from './apiClient';

export const getAllCameras = async (status?: string) => {
  const { data } = await apiClient.get('/api/cameras', {
    params: status ? { status } : {},
  });
  return data;
};


