import { parentPort, workerData } from 'worker_threads';

import { generatePromotions } from '../services';
import { parseStringToNumber } from '../utils';
import { PARAMS_DEFAULT } from '../constants';

const count = parseStringToNumber(workerData.count);
const chunkSize = workerData.chunkSize
  ? parseStringToNumber(workerData.chunkSize)
  : PARAMS_DEFAULT.PROMOTIONS_CHUNK_SIZE;
const chunksNumber = Math.ceil(count / chunkSize);

for (let i = 0; i < chunksNumber; i++) {
  const itemsNumber =
    chunkSize * (i + 1) <= count ? chunkSize : count % chunkSize;

  parentPort?.postMessage(generatePromotions(itemsNumber));
}
