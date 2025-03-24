import express from 'express';
import {
  checkJWT,
  createRing,
  deleteRing,
  editRing,
  getAllRings,
  signIn,
  signUp,
  validateRingCreation,
  validateSignUp,
} from './controllers/';
import { verifyToken } from './middlewares/auth';

const routes = express.Router();

// Auth routes
routes.post('/auth/signup', validateSignUp, signUp);
routes.post('/auth/signin', signIn);

// Ring routes
routes.post('/ring', verifyToken, validateRingCreation, createRing);
routes.get('/ring', verifyToken, getAllRings);
routes.put('/ring/:ringId', verifyToken, editRing);
routes.delete('/ring/:ringId', verifyToken, deleteRing);

routes.get('/checkJWT', verifyToken, checkJWT);

export default routes;
