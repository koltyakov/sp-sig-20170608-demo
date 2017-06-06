import { AuthConfig as SPAuthConfigirator } from 'node-sp-auth-config';
import * as path from 'path';

import { Environments } from './configs';

export async function checkOrPromptForIntegrationConfigCreds(): Promise<void> {

    let configs = [];

    for (let testConfig of Environments) {
        console.log(`\n=== ${testConfig.environmentName} Credentials ===\n`);
        await (new SPAuthConfigirator({
            configPath: testConfig.configPath
        })).getContext();
        console.log(`Gotcha ${path.resolve(testConfig.configPath)}`);
    }

    console.log('\n');

}

checkOrPromptForIntegrationConfigCreds();
