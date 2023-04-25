import axios from 'axios';
import { AlertType } from '../types'
import { CameraEventDetail, cameraEventSystem } from '../utils/eventSystem';

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get the JWT token from the cookies if the document object is defined
let token: string | undefined;
if (typeof document !== 'undefined') {
  token = document.cookie
    .split('; ')
    .find(row => row.startsWith('token='))
    ?.split('=')[1];
}

// Add the Authorization header to the apiClient instance if the token is defined
if (token) {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Add some console logs to check the request headers
apiClient.interceptors.request.use(config => {
  console.log('Request headers:', config.headers);
  return config;
});

export async function simulateDetection(cameraId: string) {
  const randomInterval = Math.floor(Math.random() * 10000) + 5000;

  setTimeout(async () => {
    const eventType = Math.random() > 0.5 ? AlertType.MOTION : AlertType.SOUND;
    const detectedAt = new Date();

    const eventDetail: CameraEventDetail = {
      cameraId,
      eventType,
      detectedAt,
    };

    // Use the imported cameraEventSystem
    cameraEventSystem.dispatchEvent(new CustomEvent('cameraEvent', { detail: eventDetail }));

    // Send the event to the backend to log it in the database
    await apiClient.post('/api/alerts', {
      cameraId,
      alertType: eventType,
      detectedAt: detectedAt.toISOString(),
    });

    // Continue simulating events
    simulateDetection(cameraId);
  }, randomInterval);
}