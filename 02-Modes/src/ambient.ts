import { Web } from 'sp-pnp-js';
import { PnpNode, IPnpNodeSettings } from 'sp-pnp-node';

let pnpNodeSettings: IPnpNodeSettings = {
    // ...
};

(new PnpNode(pnpNodeSettings)).initAmbient().then((settings) => {

    const web = new Web(settings.siteUrl);
    web.select('Title').get()
        .then(webData => {
            console.log('\nWeb title: ' + webData.Title + '\n\n');
        })
        .catch(console.log);

}).catch(console.log);
