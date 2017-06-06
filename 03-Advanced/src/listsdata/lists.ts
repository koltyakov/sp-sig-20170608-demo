import { Web } from 'sp-pnp-js';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';
import { IListInfo } from './listData';

const getLists = (web: Web, outputFile: string): Promise<IListInfo[]> => {
    return new Promise((resolve, reject) => {

        web.lists
            .select('Id,Title,RootFolder/ServerRelativeUrl,ParentWebUrl,ItemCount')
            .expand('RootFolder,ContentTypes')
            .get()
            .then((lists: any) => {
                let listsOut = lists
                    .filter((list: any) => {
                        return list.RootFolder.ServerRelativeUrl
                            .indexOf('/_catalogs/') === -1;
                    })
                    .map((list: any) => {
                        return {
                            ...list,
                            RelativeUrl: list.RootFolder.ServerRelativeUrl
                        };
                    });

                console.log(`Lists: ${listsOut.length} (done)`);
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(listsOut, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(listsOut);
                });

            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getLists;
