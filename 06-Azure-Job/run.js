'use strict';

const Job = require('./dist').Job;
const job = new Job();
job.runJob()
    .then(console.log)
    .catch(console.log);
