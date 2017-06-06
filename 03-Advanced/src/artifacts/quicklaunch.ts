import { Web } from 'sp-pnp-js';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getQuicklaunch = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {
        web.navigation.quicklaunch.expand('Children').get()
            .then((quicklaunch: any) => {
                console.log(`Quicklaunch: ${quicklaunch.length}`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(quicklaunch, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(quicklaunch);
                });
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getQuicklaunch;
