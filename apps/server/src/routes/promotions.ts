import { Router } from 'express';

import {
  getPromotions,
  insertPromotions,
  deletePromotions,
} from '../controllers';
import { ROUTE } from '../constants';

export default (app: Router): void => {
  app.get(ROUTE.PROMOTIONS, getPromotions);
  app.post(ROUTE.PROMOTIONS, insertPromotions);
  app.delete(ROUTE.PROMOTIONS, deletePromotions);
};
