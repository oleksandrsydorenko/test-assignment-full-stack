import path from 'path';
import { Request, Response } from 'express';
import { Worker } from 'worker_threads';

import { Promotion } from '../models';
import {
  calcTotalPages,
  formatPromotionsResponse,
  handleInternalServerError,
  log,
  parseStringToNumber,
} from '../utils';
import { PARAMS_DEFAULT } from '../constants';

export const getPromotions = async (req: Request, res: Response) => {
  const { limit: limitParam, page: pageParam } = req.query;
  const limit = limitParam
    ? parseStringToNumber(limitParam as string)
    : PARAMS_DEFAULT.PROMOTIONS_LIMIT;
  const page = pageParam
    ? parseStringToNumber(pageParam as string)
    : PARAMS_DEFAULT.PROMOTIONS_PAGE;

  try {
    const result = await Promotion.find()
      .sort({ serialNumber: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const count = await Promotion.countDocuments();

    res.json({
      page,
      promotions: formatPromotionsResponse(result),
      total: calcTotalPages(count, limit),
    });
  } catch (err) {
    handleInternalServerError(err, res);
  }
};

export const insertPromotions = (req: Request, res: Response) => {
  const { count: countParam, limit: limitParam } = req.body;
  const count = countParam
    ? parseStringToNumber(countParam)
    : PARAMS_DEFAULT.PROMOTIONS_COUNT;
  const limit = limitParam
    ? parseStringToNumber(limitParam)
    : PARAMS_DEFAULT.PROMOTIONS_LIMIT;
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
    try {
      const result = await Promotion.insertMany(data);
      const slicedResult = result.slice(0, limit);

      log.info('%s promotions were successfully stored', result.length);

      const totalDocuments = await Promotion.countDocuments();

      if (!res.writableEnded) {
        res.json({
          page: PARAMS_DEFAULT.PROMOTIONS_PAGE,
          promotions: formatPromotionsResponse(slicedResult),
          total: calcTotalPages(totalDocuments, limit),
        });
      }
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
    await Promotion.deleteMany({});
    res.status(200).end();
  } catch (err) {
    handleInternalServerError(err, res);
  }
};
