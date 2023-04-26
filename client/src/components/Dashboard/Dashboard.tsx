import React, { useEffect } from 'react';
import { cameraEventSystem } from '../../utils/eventSystem';
import CameraList from '../Camera/CameraList';
import { UserPropsWithLogout } from '../../App';

// Define the CameraEventDetail interface
interface CameraEventDetail {
  cameraId: string;
  eventType: string;
  timestamp: Date;
}

const Dashboard: React.FC<UserPropsWithLogout> = ({ handleLogout }) => {
  useEffect(() => {
    function handleCameraEvent(event: Event) {
      const customEvent = event as CustomEvent<CameraEventDetail>;
      const detail = customEvent.detail;
      console.log(`Camera ${detail.cameraId} detected ${detail.eventType}`);
      // Update the UI or display an alert accordingly
    }

    // Add event listener for camera events
    cameraEventSystem.addEventListener('cameraEvent', handleCameraEvent);

    return () => {
      cameraEventSystem.removeEventListener('cameraEvent', handleCameraEvent);
    };
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log(user.username);
    }
  }, []);

  // Render the component UI
  return (
    <div className="h-full bg-transparent min-h-screen flex flex-col">
      <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <span className="text-xl font-bold">N.O.T.E</span>
        <div className="flex items-center">
          <span className="mr-4">Logged in as: {localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')!).username}</span>
          <button
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
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
