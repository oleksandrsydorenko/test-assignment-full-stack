import { parentPort, workerData } from 'worker_threads';

import { generatePromotions } from '../services';

const chunksNumber = Math.ceil(workerData.count / workerData.limit);
const generate = (count: number) => generatePromotions(count);

for (let i = 0; i < chunksNumber; i++) {
  const count =
    i === chunksNumber - 1
      ? workerData.count % workerData.limit
      : workerData.limit;

  const promotions = generate(count);

  parentPort?.postMessage(promotions);
}
