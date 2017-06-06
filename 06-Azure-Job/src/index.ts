import * as pnp from 'sp-pnp-js';
import { PnpNode, IPnpNodeSettings } from 'sp-pnp-node';
import * as path from 'path';

import { Environments } from './configs';

export class Job {

    private configA: any;
    private configB: any;

    constructor(private listName: string = 'Azure Job Example') {
        this.configA = require(path.resolve(Environments[0].configPath));
        this.configB = require(path.resolve(Environments[1].configPath));
    }

    public runJob(): Promise<any> {
        async function workflow(that: any) {
            let listAData = await that.readData(that.configA);
            let listBData = await that.readData(that.configB);
            let writeToAData = listBData.filter(itemB => {
                return listAData.filter(itemA => {
                    return itemA.Title === itemB.Title;
                }).length === 0;
            });
            let writeToBData = listAData.filter(itemA => {
                return listBData.filter(itemB => {
                    return itemB.Title === itemA.Title;
                }).length === 0;
            });
            if (writeToAData.length > 0) {
                await that.writeData(that.configA, writeToAData);
            }
            if (writeToBData.length > 0) {
                await that.writeData(that.configB, writeToBData);
            }
            return [ writeToAData.length, writeToBData.length ];
        }
        return workflow(this);
    }

    private initContext(config: any, odata?: 'nometadata' | 'minimalmetadata' | 'verbose'): void {
        let pnpNodeSettings: IPnpNodeSettings = {
            siteUrl: config.siteUrl,
            authOptions: config
        };
        let headers = {};
        if (odata) {
            headers = {
                accept: `application/json; odata=${odata}`
            };
        }
        pnp.setup({
            fetchClientFactory: () => {
                return new PnpNode(pnpNodeSettings);
            },
            headers
        });
    }

    private readData(config: any): Promise<any> {
        this.initContext(config, 'nometadata');
        const web = new pnp.Web(config.siteUrl);
        return web.lists.getByTitle(this.listName).items.select('Title').get();
    }

    private writeData(config: any, data: any[]): Promise<any> {
        this.initContext(config);
        const web = new pnp.Web(config.siteUrl);
        const batch = web.createBatch();
        const list = web.lists.getByTitle(this.listName);
        for (let d of data) {
            list.items.inBatch(batch).add(d);
        }
        return batch.execute();
    }

}
