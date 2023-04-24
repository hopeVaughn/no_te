import axios from 'axios';
// Import CameraEventDetail and cameraEventSystem
import { CameraEventDetail, cameraEventSystem } from '../utils/eventSystem';

export async function simulateDetection(cameraId: number) {
  const randomInterval = Math.floor(Math.random() * 10000) + 5000;

  setTimeout(async () => {
    const eventType = Math.random() > 0.5 ? 'MOTION' : 'SOUND';
    const detectedAt = new Date();

    const eventDetail: CameraEventDetail = {
      cameraId,
      eventType,
      detectedAt,
    };

    // Use the imported cameraEventSystem
    cameraEventSystem.dispatchEvent(new CustomEvent('cameraEvent', { detail: eventDetail }));

    // Send the event to the backend to log it in the database
    await axios.post('/api/alerts', {
      cameraId,
      alertType: eventType,
      detectedAt: detectedAt.toISOString(),
    });

    // Continue simulating events
    simulateDetection(cameraId);
  }, randomInterval);
}
