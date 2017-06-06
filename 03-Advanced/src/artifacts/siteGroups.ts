import { Web } from 'sp-pnp-js';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getSiteGroups = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {
        web.siteGroups.get()
            .then((siteGroups: any) => {
                console.log(`Site groups: ${siteGroups.length}`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(siteGroups, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(siteGroups);
                });
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getSiteGroups;
