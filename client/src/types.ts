export interface Camera {
  id: string;
  name: string;
  location: string;
  status: CameraStatus;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Alert {
  id: string;
  cameraId: string;
  alertType: AlertType;
  detectedAt: Date;
  acknowledged: boolean;
  acknowledgedBy?: string;
  userId?: string;
  acknowledgedAt?: Date;
}

export enum CameraStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum AlertType {
  MOTION = 'MOTION',
  SOUND = 'SOUND',
}

export enum UserRole {
  ADMIN = 'ADMIN',
  OPERATOR = "OPERATOR"
}