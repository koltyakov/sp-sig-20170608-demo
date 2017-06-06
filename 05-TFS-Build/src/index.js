const PnpNode = require('sp-pnp-node').PnpNode;
const pnp = require('sp-pnp-js');

const argv = process.argv.slice(2).reduce((params, arg) => {
    let param = arg.split('=');
    params[param[0].replace('--', '')] = param[1];
    return params;
}, {});

if (!process.env.SITE_URL) {
    throw new Error('Site Url should be defined');
}

if (!process.env.SITE_URL) {
    throw new Error('Username should be provided');
}

if (!argv.password) {
    throw new Error('No password provided');
}

let pnpNodeSettings = {
    siteUrl: process.env.SITE_URL,
    authOptions: {
        username: process.env.USERNAME,
        password: argv.password
    }
};

pnp.setup({
    fetchClientFactory: () => {
        return new PnpNode(pnpNodeSettings);
    }
});

pnp.sp.web.select('Title').get()
    .then(webData => {
        console.log('>>>');
        console.log('Web title: ' + webData.Title);
        console.log('<<<');
    })
    .catch(console.log);
