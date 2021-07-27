// next magic allows to use workers written in typescript
// https://github.com/TypeStrong/ts-node/issues/676#issuecomment-470898116
const { workerData } = require('worker_threads');

require('ts-node').register();
require(workerData.aliasModule);
