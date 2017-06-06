const Web = require('sp-pnp-js').Web;
const PnpNode = require('sp-pnp-node').PnpNode;

(new PnpNode()).initAmbient().then((settings) => {

    const web = new Web(settings.siteUrl);
    web.select('Title').get()
        .then(webData => {
            console.log('\nWeb title: ' + webData.Title + '\n\n');
        })
        .catch(console.log);

}).catch(console.log);
