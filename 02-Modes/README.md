# Ambient and Factory modes
> when to use which

- Ambient mode
- Factory mode


## Installation

1\. Node.js project prepare and init

```bash
npm init -y
```

Touch `.gitignore`

2\. Global dependencies

```bash
npm install typescript@2.3.4 tslint ts-node -g
```

3\. Main dependencies

```bash
npm install sp-pnp-node sp-pnp-js --save
```

4\. TypeScript dependencies

```bash
npm install typescript@2.3.4 tslint ts-node --save-dev
```

5.\ Scripts

5.1. Create `ambient.ts`

```javascript
import { Web } from 'sp-pnp-js';
import { PnpNode } from 'sp-pnp-node';

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
node ./index
```

5\. Prompt for credentials

6\. Config file - `./config/private.json`