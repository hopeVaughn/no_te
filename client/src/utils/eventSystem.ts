import { AlertType } from '../types'

export interface CameraEventDetail {
  cameraId: string;
  eventType: AlertType;
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
