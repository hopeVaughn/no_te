import { NextFunction, RequestHandler } from 'express';
import { AuthenticatedRequest } from './modules/auth';
import { CameraStatus } from '@prisma/client';
import prisma from '../db';

// Request handler to add a new camera
export const addCamera: RequestHandler = async (req: AuthenticatedRequest, res, next: NextFunction) => {
  const { name, location, status, videoUrl } = req.body;

  // Validate the request data
  if (!name || !location || !status || !videoUrl) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Create a new camera record in the database
  const newCamera = await prisma.camera.create({
    data: {
      name,
      location,
      status,
      videoUrl,
    },
  });

  // Return the created camera record
  res.status(201);
  res.json(newCamera);
};

// Request handler to fetch all cameras
export const getAllCameras: RequestHandler = async (req, res, next: NextFunction) => {
  const { status } = req.query;

  let where = {};
  if (status && Object.values(CameraStatus).includes(status as CameraStatus)) {
    where = { status };
  }

  try {
    const cameras = await prisma.camera.findMany({ where });
    res.status(200).json(cameras);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching cameras' });
  }
};

// Request handler to fetch a camera by its ID
export const getCameraById: RequestHandler = async (req, res, next: NextFunction) => {
  const id = req.params.id;

  // Validate the request data
  if (!id) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Find the camera by its ID
  const camera = await prisma.camera.findUnique({
    where: { id },
  });

  // If the camera is not found, return a 404 error
  if (!camera) {
    res.status(404);
    res.json({ message: 'Camera not found' });
    return;
  }

  // Return the found camera
  res.status(200);
  res.json(camera);
};

// Request handler to update a camera by its ID
export const updateCamera: RequestHandler = async (req: AuthenticatedRequest, res, next: NextFunction) => {
  const id = req.params.id;
  const { name, location, status, videoUrl } = req.body;

  // Validate the request data
  if (!id || !name || !location || !status || !videoUrl) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Update the camera record in the database
  const updatedCamera = await prisma.camera.update({
    where: { id },
    data: {
      name,
      location,
      status,
      videoUrl,
    },
  });

  // Return the updated camera record
  res.status(200);
  res.json(updatedCamera);
};

// Request handler to delete a camera by its ID
export const deleteCamera: RequestHandler = async (req: AuthenticatedRequest, res, next: NextFunction) => {
  const id = req.params.id;

  // Validate the request data
  if (!id) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  // Delete the camera record from the database
  const deletedCamera = await prisma.camera.delete({
    where: { id },
  });

  // Return the deleted camera record
  res.status(200);
  res.json(deletedCamera);
};
