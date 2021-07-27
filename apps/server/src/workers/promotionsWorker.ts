import { parentPort, workerData } from 'worker_threads';

import { generatePromotions } from '../services';
import { PARAMS_DEFAULT } from '../constants';

const chunkSize = workerData.chunkSize || PARAMS_DEFAULT.PROMOTIONS_CHUNK_SIZE;
const chunksNumber = Math.ceil(workerData.count / chunkSize);
const generate = (count: number) => generatePromotions(count);

for (let i = 0; i < chunksNumber; i++) {
  const count =
    i === chunksNumber - 1 ? workerData.count % chunkSize : chunkSize;

  const promotions = generate(count);

  parentPort?.postMessage(promotions);
}
