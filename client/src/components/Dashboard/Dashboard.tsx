import { useEffect } from 'react';
import { cameraEventSystem } from '../../utils/eventSystem';
import { simulateDetection } from '../../services/camera';
import CameraList from '../Camera/CameraList';

// Define the Camera interface
interface Camera {
  id: string;
}

// Define the CameraEventDetail interface
interface CameraEventDetail {
  cameraId: string;
  eventType: string;
  timestamp: Date;
}

const Dashboard: React.FC = () => {
  // Assume you have an array of camera objects with an `id` property
  const cameras: Camera[] = [
    { id: "" },
    { id: "" },
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
    // cameras.forEach((camera) => {
    //   simulateDetection(camera.id);
    // });

    return () => {
      cameraEventSystem.removeEventListener('cameraEvent', handleCameraEvent);
    };
  }, []);

  // Render the component UI
  return (
    <div className="h-screen bg-white">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">N.O.T.E</div>
        <div className="text-sm">Logged in as: John Doe</div>
      </nav>
      <div className="p-4 md:p-8 lg:p-12">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <CameraList />
      </div>
    </div>
  );
};

export default Dashboard;