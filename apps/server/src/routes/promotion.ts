import { Router } from 'express';

import {
  clonePromotion,
  updatePromotion,
  deletePromotion,
} from '../controllers';

const ENDPOINT = '/promotions/:id';

export default (app: Router): void => {
  app.post(ENDPOINT, clonePromotion);
  app.put(ENDPOINT, updatePromotion);
  app.delete(ENDPOINT, deletePromotion);
};

// import { Router } from 'express';

// const ENDPOINT = '/promotions/:id';

// export default (app: Router): void => {
//   app.post(ENDPOINT, (req, res) => {
//     res.status(200).end();
//   });

//   app.put(ENDPOINT, (req, res) => {
//     res.status(200).end();
//   });

//   app.delete(ENDPOINT, (req, res) => {
//     res.status(200).end();
//   });
// };
