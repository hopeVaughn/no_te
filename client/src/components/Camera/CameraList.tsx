import React, { useEffect, useState } from 'react';
import Camera from './Camera';
import { CameraStatus, Camera as CameraType } from '../../types';
import { getAllCameras } from '../../services/cameraService';

const CameraList: React.FC = () => {
  const [cameras, setCameras] = useState<CameraType[]>([]);

  useEffect(() => {
    async function fetchCameras() {
      const camerasData = await getAllCameras();
      const onlineCameras = camerasData.filter(
        (camera: CameraType) => camera.status === CameraStatus.ONLINE
      );
      setCameras(onlineCameras);
    }

    fetchCameras();
  }, []);

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-4">Camera List</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {cameras.map((camera) => (
          <Camera key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
};

export default CameraList;