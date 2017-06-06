# "As simple as possible" from scratch to PnP JS Core on the server

- Installation
- Minimal code example in JavaScript

## Installation

1\. Node.js project prepare and init

```bash
npm init -y
```

Touch `.gitignore`

2\. Install dependencies

```bash
npm install sp-pnp-node sp-pnp-js --save
```

3\. Create `./src/index.js`

```javascript
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
```

4\. Run script on the server

```bash
node ./src/index
```

5\. Prompt for credentials

6\. Config file - `./config/private.json`