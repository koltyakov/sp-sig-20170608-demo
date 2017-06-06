import * as pnp from 'sp-pnp-js';
import { PnpNode, IPnpNodeSettings } from 'sp-pnp-node';
import * as path from 'path';

import { environment } from './env';

import getFields from './artifacts/fields';
import getAvailablefields from './artifacts/availablefields';
import getContentTypes from './artifacts/contentTypes';
import getQuicklaunch from './artifacts/quicklaunch';
import getTopNavigationBar from './artifacts/topNavigationBar';
import getSiteGroups from './artifacts/siteGroups';
import getLists from './artifacts/lists';
import getUsers from './listsdata/users';
import getListsMeta from './listsdata/lists';
import { getListsData } from './listsdata/listData';

export async function runExportJob(): Promise<void> {

    let config = require(path.resolve(environment.configPath));

    let pnpNodeSettings: IPnpNodeSettings = {
        siteUrl: config.siteUrl,
        authOptions: config
    };

    pnp.setup({
        fetchClientFactory: () => {
            return new PnpNode(pnpNodeSettings);
        },
        headers: {
            accept: 'application/json;odata=nometadata'
        }
    });

    const web = new pnp.Web(config.siteUrl);

    console.log('\nFetching fields...');
    await getFields(web, './export/artifacts/fields.json');

    console.log('\nFetching available fields...');
    await getAvailablefields(web, './export/artifacts/availableFields.json');

    console.log('\nFetching content types...');
    await getContentTypes(web, './export/artifacts/contentTypes.json');

    console.log('\nFetching quick launch...');
    await getQuicklaunch(web, './export/artifacts/quicklaunch.json');

    console.log('\nFetching ton navigation bar...');
    await getTopNavigationBar(web, './export/artifacts/topNavigationBar.json');

    console.log('\nFetching site groups...');
    await getSiteGroups(web, './export/artifacts/siteGroups.json');

    console.log('\nFetching lists...');
    await getLists(web, './export/artifacts/lists.json');

    console.log('\nFetching users...');
    await getUsers(web, './export/listdata/users.json');

    console.log('\nFetching lists...');
    let listsMetadata = await getListsMeta(web, './export/listdata/lists.json');

    console.log(`\nFetching lists' data...`);
    await getListsData(web, listsMetadata, './export/listdata/data');

    console.log('\nJob execution is finished');

}
