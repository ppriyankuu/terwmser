import { json, urlencoded } from 'body-parser';
import express, { Request, Response, type Express } from 'express';
import cors from 'cors';
import morgan from 'morgan';

export const createServer = (): Express => {
  const app = express();

  app
    .disable('x-powered-by')
    .use(morgan('dev'))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get('/message/:name', (req: Request, res: Response) => {
      return res.json({ message: `hey ${req.params.name}` });
    })
    .get('/status', (_req: Request, res: Response) => {
      return res.json({ statusOk: true });
    });

  return app;
};
