import { RequestHandler } from 'express';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import { User } from '@prisma/client';

interface UserType extends User {
  name: string;
}

// Request handler to create a new user
export const createNewUser: RequestHandler = async (req, res) => {
  // Create the user in the database
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  // Create a JWT token for the user and send it in the response
  const token = createJWT(user as UserType);
  res.json({ token });
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
  const token = createJWT(user as UserType);
  res.json({ token });
};
