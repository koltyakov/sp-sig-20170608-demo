import { AuthConfig as SPAuthConfigirator } from 'node-sp-auth-config';
import * as colors from 'colors';
import * as path from 'path';

import { environment } from './env';

export async function checkOrPromptForIntegrationConfigCreds(): Promise<void> {

    let configs = [];

    console.log(`\n=== ${colors.bold.yellow(`${environment.environmentName} Credentials`)} ===\n`);
    await (new SPAuthConfigirator({
        configPath: environment.configPath
    })).getContext();
    console.log(colors.grey(`Gotcha ${path.resolve(environment.configPath)}`));

    console.log('\n');

}

checkOrPromptForIntegrationConfigCreds();
