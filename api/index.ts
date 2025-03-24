import 'reflect-metadata';
import express, { Application } from 'express';
import db from './src/models';
import morgan from 'morgan';
import path from 'path';
import axios from 'axios';
import routes from './src/routes';
import cors from 'cors';

import { createServer } from 'http';

const app: Application = express();
app.use(cors());
const port = 3000;

const httpServer = createServer(app);

const start = async () => {
  await db.sync({ alter: true });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));
  app.set('trust proxy', true);
  app.disable('etag');
  app.use('/files', express.static(path.resolve(__dirname, 'src', 'tmp', 'uploads')));
  app.use('/images', express.static(path.resolve(__dirname, 'src', 'images')));

  axios.interceptors.request.use((request) => {
    request.maxContentLength = Infinity;
    request.maxBodyLength = Infinity;
    return request;
  });

  app.use(routes);
  try {
    httpServer.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error: any) {
    console.log(`Error occurred: ${error.message}`);
  }
};

void start();
