import { Web } from 'sp-pnp-js';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getFields = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {
        web.fields.get()
            .then((fields: any) => {
                console.log(`Fields: ${fields.length}`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(fields, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(fields);
                });
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getFields;
