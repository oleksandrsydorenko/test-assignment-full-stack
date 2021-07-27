import { Router } from 'express';

import {
  getPromotions,
  insertPromotions,
  deletePromotions,
} from '../controllers';

const ENDPOINT = '/promotions';

export default (app: Router): void => {
  app.get(ENDPOINT, getPromotions);
  app.post(ENDPOINT, insertPromotions);
  app.delete(ENDPOINT, deletePromotions);
};

// import path from 'path';
// import { Router } from 'express';
// import { Worker } from 'worker_threads';

// import { log } from '../utils';
// import { ERROR_RESPONSE } from '../constants';

// const ENDPOINT = '/promotions';

// export default (app: Router): void => {
//   app.get(ENDPOINT, (req, res) => {
//     res.status(200);
//     res.json({
//       data: [],
//     });
//   });

//   app.post(ENDPOINT, (req, res) => {
//     const params = req.body;
//     const worker = new Worker('./src/workers/promotionsWorker.js', {
//       workerData: {
//         aliasModule: path.resolve(__dirname, '../workers/promotionsWorker.ts'),
//         count: Number.parseInt(params.count, 10),
//       },
//     });

//     worker.on('message', data => {
//       if (!res.writableEnded) {
//         res.status(200).json(data);
//       }
//     });
//     worker.on('error', error => {
//       log.error(error);
//       res.status(500).json(ERROR_RESPONSE.INTERNAL_SERVER_ERROR);
//     });
//   });

//   app.delete(ENDPOINT, (req, res) => {
//     res.status(200).end();
//   });
// };
