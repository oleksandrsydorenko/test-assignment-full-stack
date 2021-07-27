import cors from 'cors';
import express, { Application } from 'express';

import routes from '../routes';

export default (app: Application): void => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use((_, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
  });
  app.use(routes());
  app.use((_, res): void => {
    res.status(404).send('Not Found');
  });
};
