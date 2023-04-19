import { RequestHandler } from 'express';
import prisma from '../db';
import { comparePasswords, createJWT, hashPassword } from '../modules/auth';
import { User } from '@prisma/client';

interface UserType extends User {
  name: string;
}

export const createNewUser: RequestHandler = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await hashPassword(req.body.password),
    },
  });

  const token = createJWT(user as UserType);
  res.json({ token });
};

export const signin: RequestHandler = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ message: 'invalid input' });
    return;
  }

  const isValid = await comparePasswords(req.body.password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({ message: 'invalid input' });
    return;
  }

  const token = createJWT(user as UserType);
  res.json({ token });
};
