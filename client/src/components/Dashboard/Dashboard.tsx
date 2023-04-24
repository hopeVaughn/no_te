import { useEffect } from 'react';
import { cameraEventSystem } from '../../utils/eventSystem';
import { simulateDetection } from '../../services/camera';

// Define the Camera interface
interface Camera {
  id: number;
}

// Define the CameraEventDetail interface
interface CameraEventDetail {
  cameraId: number;
  eventType: string;
  timestamp: Date;
}

const Dashboard: React.FC = () => {
  // Assume you have an array of camera objects with an `id` property
  const cameras: Camera[] = [
    { id: 1 },
    { id: 2 },
    // ...
  ];

  useEffect(() => {
    function handleCameraEvent(event: Event) {
      const customEvent = event as CustomEvent<CameraEventDetail>;
      const detail = customEvent.detail;
      console.log(`Camera ${detail.cameraId} detected ${detail.eventType}`);
      // Update the UI or display an alert accordingly
    }

    // Add event listener for camera events
    cameraEventSystem.addEventListener('cameraEvent', handleCameraEvent);

    // Call simulateDetection for each camera
    cameras.forEach((camera) => {
      simulateDetection(camera.id);
    });

    return () => {
      cameraEventSystem.removeEventListener('cameraEvent', handleCameraEvent);
    };
  }, []);

  // Render the component UI
  return (
    <div>
      <h1>Dashboard</h1>
      {/* Render your camera feeds and other UI elements here */}
    </div>
  );
};

export default Dashboard;
