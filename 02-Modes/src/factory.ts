import * as pnp from 'sp-pnp-js';
import { PnpNode, IPnpNodeSettings } from 'sp-pnp-node';

let config = require('../config/private.json');

let pnpNodeSettings: IPnpNodeSettings = {
    siteUrl: config.siteUrl,
    authOptions: config
};

pnp.setup({
    fetchClientFactory: () => {
        return new PnpNode(pnpNodeSettings);
    }
    // baseUrl: config.siteUrl
});

const web = pnp.sp.web;
web.select('Title').get()
    .then(webData => {
        console.log('\nWeb title: ' + webData.Title + '\n\n');
    })
    .catch(console.log);

// or

/*
const web = new pnp.Web(config.siteUrl);
web.select('Title').get()
    .then(webData => {
        console.log('\nWeb title: ' + webData.Title + '\n\n');
    })
    .catch(console.log);
*/
