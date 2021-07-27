import path from 'path';
import { Request, Response } from 'express';
import { Worker } from 'worker_threads';

import { Promotion } from '../models';
import { log } from '../utils';
import { ERROR_RESPONSE } from '../constants';

const DEFAULT_LIMIT = 50;

const handleInternalServerError = (err: Error, res: Response): void => {
  log.error(err);
  res.status(500).json(ERROR_RESPONSE.INTERNAL_SERVER_ERROR);
};

const parseParamAsNumber = (param: string): number =>
  Number.parseInt(param, 10);

export const getPromotions = async (req: Request, res: Response) => {
  const { limit: limitParam, page: pageParam } = req.query;
  const limit = limitParam
    ? parseParamAsNumber(limitParam as string)
    : DEFAULT_LIMIT;
  const page = pageParam ? parseParamAsNumber(pageParam as string) : 1;

  try {
    const promotions = await Promotion.find()
      .limit(limit)
      .skip(page * limit);

    const count = await Promotion.countDocuments();

    res.json({
      promotions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (err) {
    handleInternalServerError(err, res);
  }
};

export const insertPromotions = (req: Request, res: Response) => {
  const { count: countParam, limit: limitParam } = req.body;
  const count = parseParamAsNumber(countParam);
  const limit = limitParam ? parseParamAsNumber(limitParam) : DEFAULT_LIMIT;
  const worker = new Worker(
    path.resolve(__dirname, '../workers/promotionsWorker.js'),
    {
      workerData: {
        count,
        aliasModule: path.resolve(__dirname, '../workers/promotionsWorker.ts'),
      },
    }
  );

  worker.on('message', async data => {
    if (!res.writableEnded) {
      res.status(200).json({
        promotions: data,
        totalPages: Math.ceil(count / limit),
        currentPage: 1,
      });
    }

    try {
      const result = await Promotion.insertMany(data);

      log.info('%d promotions were successfully stored', result.length);
    } catch (err) {
      handleInternalServerError(err, res);
    }
  });

  worker.on('error', err => {
    handleInternalServerError(err, res);
  });
};

export const deletePromotions = async (req: Request, res: Response) => {
  try {
    await Promotion.collection.deleteMany({});
    res.status(200).end();
  } catch (err) {
    handleInternalServerError(err, res);
  }
};
