export interface FormData {
  username: string;
  password: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

export interface User {
  userId: string;
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
}
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
  acknowledgedBy?: User;
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