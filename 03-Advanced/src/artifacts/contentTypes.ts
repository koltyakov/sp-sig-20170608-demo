import { Web } from 'sp-pnp-js';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getContentTypes = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {
        web.contentTypes
            .get()
            .then((contentTypes: any) => {
                console.log(`Content types: ${contentTypes.length}`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(contentTypes, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(contentTypes);
                });
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getContentTypes;
