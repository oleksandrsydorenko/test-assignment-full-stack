import { parentPort, workerData } from 'worker_threads';

import { generatePromotions } from '../services';

const MAX_CHUNK_LENGTH = 50;
const chunksNumber = Math.ceil(workerData.count / MAX_CHUNK_LENGTH);

const generate = (count: number) => generatePromotions(count);

for (let i = 0; i < chunksNumber; i++) {
  const count =
    i === chunksNumber - 1
      ? workerData.count % MAX_CHUNK_LENGTH
      : MAX_CHUNK_LENGTH;

  const promotions = generate(count);

  parentPort?.postMessage(promotions);
}
