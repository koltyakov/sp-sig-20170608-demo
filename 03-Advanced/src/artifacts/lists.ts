import { Web } from 'sp-pnp-js';
import * as Promise from 'bluebird';
import * as fs from 'fs';

import { checkOrCreateFileFolderSync } from '../utils';

const getLists = (web: Web, outputFile: string) => {
    return new Promise((resolve, reject) => {
        web.lists
            .select('Id,Title,RootFolder/ServerRelativeUrl,ParentWebUrl,ItemCount')
            .expand('RootFolder')
            .get()
            .then((lists: any) => {
                let listsOut = lists
                    .filter((list: any) => {
                        return list.RootFolder.ServerRelativeUrl
                            .indexOf('/_catalogs/') === -1;
                    });

                const expandListsProps: string[] = [
                    'ContentTypes',
                    'ContentTypes/FieldLinks',
                    'ContentTypes/Fields',
                    'ContentTypes/Parent',
                    'Fields',
                    'Views',
                    'Views/ViewFields',
                    'RootFolder'
                ];

                Promise
                    .map(listsOut, (list: any) => {
                        console.log(`  List '${list.Title}'...`);
                        return new Promise((res, rej) => {
                            web.lists
                                .getById(list.Id)
                                .expand(expandListsProps.join(','))
                                .get()
                                .then((listData: any) => {
                                    listsOut.forEach((listOut: any, index: number) => {
                                        if (listOut.Id === listData.Id) {
                                            listsOut[index] = {
                                                ...listOut,
                                                ...listData
                                            };
                                        }
                                    });
                                    res();
                                })
                                .catch((err: any) => {
                                    listsOut.forEach((listOut: any, index: number) => {
                                        if (listOut.Id === list.Id) {
                                            listsOut[index] = {
                                                ...listOut,
                                                ExceptionMessage: err
                                            };
                                        }
                                    });
                                    console.log(`   > Lists proceding error '${list.Title}'`);
                                    console.log(`   < Error: ${err}`);
                                    res();
                                });
                        });
                    })
                    .then(() => {
                        console.log(`Lists: ${listsOut.length} (done)`);
                        checkOrCreateFileFolderSync(outputFile);
                        fs.writeFile(outputFile, JSON.stringify(listsOut, null, 2), 'utf8', (err: any) => {
                            if (err) {
                                reject(err);
                            }
                            resolve(listsOut);
                        });
                    });

            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export default getLists;
