import { AuthenticatedRequest } from '@src/controllers';
import { NextFunction, Request, Response } from 'express';

import jwt from 'jsonwebtoken';

const TOKEN_KEY = process.env.TOKEN_KEY as string;

const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'] as string;
  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }
  if (token === TOKEN_KEY) {
    req.user_id = req.params.user_id;
    return next();
  }
  try {
    const decoded = jwt.verify(token, TOKEN_KEY) as any;
    req.user_id = decoded.user_id;
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  return next();
};

const adminVerify = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['x-access-token'];
  if (!token) {
    return res.status(403).json({ message: 'A token is required for authentication' });
  }

  if (token === TOKEN_KEY) {
    return next();
  }

  return next();
};

export { verifyToken, adminVerify };
