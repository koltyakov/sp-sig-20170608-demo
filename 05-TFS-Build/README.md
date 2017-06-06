# Running PnP JS Core in TFS Build

- Environment variables
- Tests execution in TFS Build

## Setup a build

Blank template.

### Steps

#### `Get sources` tasks

#### `npm` task

Working directory: `./05-TFS-Build`
npm command: `install`

#### `Batch Script` task

Path: `C:\Program Files\nodejs\node.exe`
Arguments: `./src/index.js --password="$(password)"`
Working folder: `./05-TFS-Build`

### Variables

SITE_URL: [...]
USERNAME: [...]
PASSWORD: [...]