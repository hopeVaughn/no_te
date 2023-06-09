import React, { useEffect, useState } from 'react';
import Camera from './Camera';
import { CameraStatus, Camera as CameraType } from '../../types';
import { getAllCameras } from '../../services/cameraService';


const CameraList: React.FC = () => {
  // Initialize state variables for cameras, showAllCameras flag, and loading status
  const [cameras, setCameras] = useState<CameraType[]>([]);
  const [showAllCameras, setShowAllCameras] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // UseEffect to fetch and set cameras
  useEffect(() => {
    // Function to fetch all cameras
    async function fetchCameras() {
      const camerasData = await getAllCameras();
      setCameras(camerasData);
    }

    // Function to fetch only online cameras
    async function fetchOnlineCameras() {
      const camerasData = await getAllCameras();
      const onlineCameras = camerasData.filter(
        (camera: CameraType) => camera.status === CameraStatus.ONLINE
      );
      setCameras(onlineCameras);
    }

    // Fetch cameras based on showAllCameras state
    if (showAllCameras) {
      fetchCameras().then(() => setIsLoading(false));
    } else {
      fetchOnlineCameras().then(() => setIsLoading(false));
    }
  }, [showAllCameras]); // Depend on showAllCameras state

  // Set buttonText based on showAllCameras state
  const buttonText = showAllCameras ? 'Online Cameras' : 'All Cameras';

  // Handle button click to toggle showAllCameras state
  const handleButtonClick = () => {
    setIsLoading(true);
    setShowAllCameras(!showAllCameras);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 flex-grow">
      <h1 className="text-2xl font-bold mb-4">Camera List</h1>
      <button className="bg-gray-800 text-white py-2 px-4 rounded-md mr-4 mb-4" onClick={handleButtonClick}>{buttonText}</button>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading cameras...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mb-4">
          {cameras.map((camera) => (
            <Camera key={camera.id} camera={camera} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CameraList;
