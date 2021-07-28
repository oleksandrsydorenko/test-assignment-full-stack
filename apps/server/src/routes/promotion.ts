import { Router } from 'express';

import {
  duplicatePromotion,
  updatePromotion,
  deletePromotion,
} from '../controllers';
import { ROUTE } from '../constants';

export default (app: Router): void => {
  app.post(ROUTE.PROMOTION, duplicatePromotion);
  app.put(ROUTE.PROMOTION, updatePromotion);
  app.delete(ROUTE.PROMOTION, deletePromotion);
};
