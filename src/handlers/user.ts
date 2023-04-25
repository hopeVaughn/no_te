import { RequestHandler } from 'express';
import prisma from '../db';
import { User } from '@prisma/client';
import { comparePasswords, createJWT, hashPassword, AuthenticatedRequest } from './modules/auth';

// Request handler to create a new user
export const createNewUser: RequestHandler = async (req, res, next) => {
  // Create the user in the database
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: 'OPERATOR'
      },
    });

    // Create a JWT token for the user and send it in the response
    const token = createJWT(user as User);
    res.json({ token });

  } catch (error) {
    console.error(error.message)
    error.type = 'input'
    next(error)
  }
};

// Request handler to authenticate a user
export const signin: RequestHandler = async (req, res) => {
  // Find the user in the database by their username
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  // If the user is not found, return an error response
  if (!user) {
    res.status(401);
    res.json({ message: 'invalid input' });
    return;
  }

  // Compare the password with the stored hash
  const isValid = await comparePasswords(req.body.password, user.password);

  // If the password is invalid, return an error response
  if (!isValid) {
    res.status(401);
    res.json({ message: 'invalid input' });
    return;
  }

  // Create a JWT token for the user and send it in the response
  const token = createJWT(user as User);

  // Set the JWT as a cookie
  res.cookie('token', token, {
    // httpOnly: true,
    secure: true,
  });

  res.status(200).json({ message: 'Authenticated successfully', token });
};


// Get all users and user by id handlers are using ensureAdmin handler in routes to protect these.

export const getAllUsers: RequestHandler = async (req: AuthenticatedRequest, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error fetching users' });
  }
};


export const getUserById: RequestHandler = async (req: AuthenticatedRequest, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400);
    res.json({ message: 'Invalid request data' });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    res.status(404);
    res.json({ message: 'User not found' });
    return;
  }

  res.status(200);
  res.json(user);
};