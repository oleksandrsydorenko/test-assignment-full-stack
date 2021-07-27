import path from 'path';
import { Request, Response } from 'express';
import { Worker } from 'worker_threads';

import { Promotion } from '../models';
import { handleInternalServerError, log } from '../utils';
import { PARAMS_DEFAULT } from '../constants';

const calcTotalPages = (count: number, limit: number) =>
  Math.ceil(count / limit);
const parseParamAsNumber = (param: string): number =>
  Number.parseInt(param, 10);

export const getPromotions = async (req: Request, res: Response) => {
  const { limit: limitParam, page: pageParam } = req.query;
  const limit = limitParam
    ? parseParamAsNumber(limitParam as string)
    : PARAMS_DEFAULT.PROMOTIONS_LIMIT;
  const page = pageParam
    ? parseParamAsNumber(pageParam as string)
    : PARAMS_DEFAULT.PROMOTIONS_PAGE;

  try {
    const promotions = await Promotion.find()
      .limit(limit)
      .skip(page * limit);

    const count = await Promotion.countDocuments();

    res.json({
      promotions,
      page,
      total: calcTotalPages(count, limit),
    });
  } catch (err) {
    handleInternalServerError(err, res);
  }
};

export const insertPromotions = (req: Request, res: Response) => {
  const { count: countParam, limit: limitParam } = req.body;
  const count = countParam
    ? parseParamAsNumber(countParam)
    : PARAMS_DEFAULT.PROMOTIONS_COUNT;
  const limit = limitParam
    ? parseParamAsNumber(limitParam)
    : PARAMS_DEFAULT.PROMOTIONS_LIMIT;
  const worker = new Worker(
    path.resolve(__dirname, '../workers/promotionsWorker.js'),
    {
      workerData: {
        count,
        limit,
        aliasModule: path.resolve(__dirname, '../workers/promotionsWorker.ts'),
      },
    }
  );

  worker.on('message', async data => {
    if (!res.writableEnded) {
      res.status(200).json({
        page: PARAMS_DEFAULT.PROMOTIONS_PAGE,
        promotions: data,
        totalPages: calcTotalPages(count, limit),
      });
    }

    try {
      const result = await Promotion.insertMany(data);

      log.info('%s promotions were successfully stored', result.length);
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
