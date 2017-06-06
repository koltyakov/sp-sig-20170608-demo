import { Web } from 'sp-pnp-js';
import * as fs from 'fs';
import * as Promise from 'bluebird';
import * as path from 'path';

import { checkOrCreateFileFolderSync } from '../utils';

export interface IListInfo {
    Id: string;
    ItemCount: number;
    Title: string;
    RelativeUrl: string;
}

export const getListData = (web: Web, listInfo: IListInfo, outputFile: string) => {
    return new Promise((resolve, reject) => {

        web.lists
            .getById(listInfo.Id)
            .items
            .expand('ContentType')
            .top(5000)
            .get()
            .then((items: any) => {
                console.log(`List '${listInfo.Title}' items: ${items.length}`);
                let itemsOut = items.map((item: any) => {
                    return {
                        ...item,
                        ContentType: {
                            Id: item.ContentType.StringId,
                            Name: item.ContentType.Name
                        }
                    };
                });
                checkOrCreateFileFolderSync(outputFile);
                fs.writeFile(outputFile, JSON.stringify(itemsOut, null, 2), 'utf8', (err: any) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(itemsOut);
                });
            })
            .catch((err: any) => {
                reject(err);
            });
    });
};

export const getLargeListsData = (web: Web, listInfo: IListInfo, outputFile: string, skipId: number = undefined, results: any[] = []) => {
    const pageSize = 5000;
    let itemsReq = web.lists.getById(listInfo.Id).items.expand('ContentType');
    results = results || [];
    return new Promise((resolve, reject) => {
        let getItemsPromise;
        if (typeof skipId === 'undefined') {
            getItemsPromise = itemsReq.top(pageSize).getPaged();
        } else {
            getItemsPromise = itemsReq.top(pageSize).skip(skipId).getPaged();
        }
        getItemsPromise
            .then(r => {
                results = [].concat(results, r.results);
                if (r.hasNext) {
                    // tslint:disable-next-line:radix
                    skipId = parseInt(decodeURIComponent(r.nextUrl).replace('$skiptoken=Paged=TRUE&p_ID=', '').split('?')[1].split('&')[0]);
                    resolve(getLargeListsData(web, listInfo, outputFile, skipId, results));
                } else {
                    console.log(`List '${listInfo.Title}' items: ${results.length}`);

                    let resultsOut = results.map((item: any) => {
                        return {
                            ...item,
                            ContentType: {
                                Id: item.ContentType.StringId,
                                Name: item.ContentType.Name
                            }
                        };
                    });

                    checkOrCreateFileFolderSync(outputFile);
                    fs.writeFile(outputFile, JSON.stringify(resultsOut, null, 2), 'utf8', (err: any) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(resultsOut);
                    });

                    resolve(results);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
};

export const getListsData = (web: Web, listsInfo: IListInfo[], baseOutputPath: string) => {
    return new Promise((resolve, reject) => {
        Promise
            .map(listsInfo, (listInfo: IListInfo) => {
                console.log(`  List '${listInfo.Title}'...`);
                // return getListData(web, listInfo, path.join(baseOutputPath, listInfo.RelativeUrl.split('/').pop()) + '.json')
                return getLargeListsData(web, listInfo, path.join(baseOutputPath, listInfo.RelativeUrl.split('/').pop()) + '.json')
                    .then((items: any[]) => {
                        return items;
                    })
                    .catch((err: any) => {
                        console.log(`   > Lists proceding error '${listInfo.Title}'`);
                        console.log(`   < Error: ${err}`);
                    });
            })
            .then(() => {
                console.log(`Lists: ${listsInfo.length} (done)`);
                resolve();
            });
    });
};
