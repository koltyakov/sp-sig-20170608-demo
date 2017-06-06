import { Job } from './src';
const job = new Job();
job.runJob()
    .then(console.log)
    .catch(console.log);
