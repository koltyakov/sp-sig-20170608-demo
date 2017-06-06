import { Web } from 'sp-pnp-js';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getAvailableFields = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {
        web.availablefields.get()
            .then((availablefields: any) => {
                console.log(`Available fields: ${availablefields.length}`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(availablefields, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(availablefields);
                });
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getAvailableFields;
