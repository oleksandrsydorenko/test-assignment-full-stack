import { Router } from 'express';

import promotion from './promotion';
import promotions from './promotions';

export default (): Router => {
  const app: Router = Router();

  promotion(app);
  promotions(app);

  return app;
};
