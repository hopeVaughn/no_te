import { createNewUser, signin, getAllUsers, getUserById } from "./user";
import { addAlert, getAllAlerts, getAlertById, acknowledgeAlert } from "./alerts"
import { addCamera, getAllCameras, getCameraById, updateCamera, deleteCamera } from './camera'

export {
  createNewUser,
  signin,
  addAlert,
  getAllAlerts,
  getAlertById,
  acknowledgeAlert,
  addCamera,
  getAllCameras,
  getCameraById,
  updateCamera,
  deleteCamera,
  getAllUsers,
  getUserById
}