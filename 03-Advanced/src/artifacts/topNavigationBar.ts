import { Web } from 'sp-pnp-js';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getTopNavigationBar = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {
        web.navigation.topNavigationBar.expand('Children').get()
            .then((topNavigationBar: any) => {
                console.log(`Top navigation: ${topNavigationBar.length}`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(topNavigationBar, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(topNavigationBar);
                });
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getTopNavigationBar;
