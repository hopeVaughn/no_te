// Add this interface definition
export interface CameraEventDetail {
  cameraId: number;
  eventType: string;
  detectedAt: Date;
}

class CameraEventSystem extends EventTarget {
  static instance: CameraEventSystem;

  constructor () {
    super();
    if (!CameraEventSystem.instance) {
      CameraEventSystem.instance = this;
    }
    return CameraEventSystem.instance;
  }
}

export const cameraEventSystem = new CameraEventSystem();
