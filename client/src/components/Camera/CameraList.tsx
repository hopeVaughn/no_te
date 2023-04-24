import React, { useEffect, useState } from 'react';
import Camera from './Camera';
import { Camera as CameraType } from '../../types';
import { getAllCameras } from '../../services/cameraService';

const CameraList: React.FC = () => {
  const [cameras, setCameras] = useState<CameraType[]>([]);

  useEffect(() => {
    async function fetchCameras() {
      const camerasData = await getAllCameras();
      setCameras(camerasData);
    }

    fetchCameras();
  }, []);

  return (
    <div>
      <h1>Camera List</h1>
      {cameras.map((camera) => (
        <Camera key={camera.id} camera={camera} />
      ))}
    </div>
  );
};

export default CameraList;