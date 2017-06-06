import { Web } from 'sp-pnp-js';
import * as Promise from 'bluebird';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getUsers = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {

        web.siteUsers
            .get()
            .then((users: any) => {
                console.log(`Users: ${users.length} (done)`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(users, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(users);
                });

            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getUsers;
