// Import necessary modules and interfaces
import { RequestHandler } from 'express';
import prisma from '../db';
import { AuthenticatedRequest } from '../modules/auth';
import { Alert, AlertType, Camera } from '@prisma/client';

// Define an interface for the request body of the `processCameraAlert` handler
interface CameraAlert {
  cameraId: Camera['id'];
  alertType: AlertType;
  detectedAt: Alert['detectedAt']
}

// This handler expects a POST request containing a JSON object with `cameraId`, `alertType`, and `detectedAt` properties.
export const processCameraAlert: RequestHandler = async (req, res) => {
  // Extract the necessary data from the request body
  const { cameraId, alertType, detectedAt }: CameraAlert = req.body;

  // Validate the request data
  if (!cameraId || !alertType || !detectedAt) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Check if the camera exists
  const camera = await prisma.camera.findUnique({
    where: { id: cameraId },
  });

  // Return an error response if the camera is not found
  if (!camera) {
    res.status(404);
    res.json({ message: 'Camera not found' });
    return;
  }

  // Create a new alert record in the database
  const newAlert = await prisma.alert.create({
    data: {
      cameraId,
      alertType,
      detectedAt: new Date(detectedAt),
      acknowledged: false,
    },
  });

  // Return the created alert record
  res.status(201);
  res.json(newAlert);
};


// This handler expects a PUT request with a URL parameter (`id`) specifying the ID of the alert to be acknowledged.
export const acknowledgeAlert: RequestHandler = async (req: AuthenticatedRequest, res) => {
  // Extract the alert ID from the URL parameter
  const id = req.params.id;

  // Validate the request data
  if (!id) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Check if the alert exists
  const alert = await prisma.alert.findUnique({
    where: { id },
  });

  // Return an error response if the alert is not found
  if (!alert) {
    res.status(404);
    res.json({ message: 'Alert not found' });
    return;
  }

  // Return an error response if the alert has already been acknowledged
  if (alert.acknowledged) {
    res.status(400);
    res.json({ message: 'Alert already acknowledged' });
    return;
  }

  // Update the alert record in the database
  const updatedAlert = await prisma.alert.update({
    where: { id },
    data: {
      acknowledged: true,
      acknowledgedBy: { connect: { id: req.user.id } },
      acknowledgedAt: new Date(),
    },
  });

  // Return the updated alert record
  res.status(200);
  res.json(updatedAlert);
};


// This handler expects a GET request and returns all alert records in the database.
export const getAllAlerts: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    // Query all alert records and include associated camera and acknowledgedBy data
    const alerts = await prisma.alert.findMany({
      include: {
        camera: true,
        acknowledgedBy: true,
      },
    });

    // Return the alert records
    res.status(200).json(alerts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching alerts' });
  }
};


// This handler expects a GET request with a URL parameter (`id`) specifying the ID of the alert to retrieve.
export const getAlertById: RequestHandler = async (req, res) => {
  // Extract the alert ID from the URL parameter
  const id = req.params.id;

  // Validate the request data
  if (!id) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Query the alert record with the specified ID and include associated camera and acknowledgedBy data
  const alert = await prisma.alert.findUnique({
    where: { id },
    select: {
      id: true,
      cameraId: true,
      alertType: true,
      detectedAt: true,
      acknowledged: true,
      acknowledgedAt: true,
      camera: {
        select: {
          id: true,
          name: true,
          location: true,
          status: true,
          videoUrl: true,
        },
      },
      acknowledgedBy: {
        select: {
          id: true,
          username: true,
          email: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      },
    },
  });

  // Return an error response if the alert is not found
  if (!alert) {
    res.status(404);
    res.json({ message: 'Alert not found' });
    return;
  }

  // Return the alert record
  res.status(200);
  res.json(alert);
};
