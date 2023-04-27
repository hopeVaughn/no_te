import apiClient from './apiClient';
import { Alert } from '../types';

// Fetch all alerts for given Camera
export const fetchAlerts = async (cameraId: string): Promise<Alert[]> => {
  try {
    const response = await apiClient.get(`/api/alerts/camera/${cameraId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Handles acknowledging the alert and assigns user id to db
export const updateAlert = async (alertId: string, data: Partial<Alert>, userId: string) => {
  try {
    const response = await apiClient.put(`/api/alerts/acknowledge/${alertId}`, { ...data, userId });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
