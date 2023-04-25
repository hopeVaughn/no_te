import { useEffect } from 'react';
import { cameraEventSystem } from '../../utils/eventSystem';
import { simulateDetection } from '../../services/camera';
import CameraList from '../Camera/CameraList';
import { UserPropsWithLogout } from '../../App';

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

const Dashboard: React.FC<UserPropsWithLogout> = ({ id, username, role, handleLogout }) => {

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
  console.log(username);

  // Render the component UI
  return (
    <div className="h-full bg-transparent min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <div className="text-lg font-bold">N.O.T.E</div>
        <div className="text-sm flex items-center">
          Logged in as: {username}
          <div className="ml-4">
            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="flex-grow p-4 md:p-8 lg:p-12">
        <h1 className="text-2xl font-bold text-black mb-4">Dashboard</h1>
        <CameraList />
      </div>
    </div>
  );
};

export default Dashboard;