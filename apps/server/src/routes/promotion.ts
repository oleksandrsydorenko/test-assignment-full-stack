import { Router } from 'express';

import {
  clonePromotion,
  updatePromotion,
  deletePromotion,
} from '../controllers';
import { ROUTE } from '../constants';

export default (app: Router): void => {
  app.post(ROUTE.PROMOTION, clonePromotion);
  app.put(ROUTE.PROMOTION, updatePromotion);
  app.delete(ROUTE.PROMOTION, deletePromotion);
};
