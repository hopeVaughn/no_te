import { createNewUser, signin, getAllUsers, getUserById } from "./user";
import { processCameraAlert, getAllAlerts, getAlertById } from "./alerts"
import { addCamera, getAllCameras, getCameraById, updateCamera, deleteCamera } from './camera'

export {
  createNewUser,
  signin,
  processCameraAlert,
  getAllAlerts,
  getAlertById,
  addCamera,
  getAllCameras,
  getCameraById,
  updateCamera,
  deleteCamera,
  getAllUsers,
  getUserById
}