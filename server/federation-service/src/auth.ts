import jwt from 'jsonwebtoken';
import env from './env';
import { JwtPayload } from './types';

export const verifyAuthToken = (token: string): JwtPayload | string => {
  try {
    return jwt.verify(token, env.jwtSecret) as JwtPayload;
  } catch (err) {
    return err;
  }
};
