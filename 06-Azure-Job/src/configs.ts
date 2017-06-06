export interface IEnvironmentConfig {
    environmentName: string;
    configPath: string;
    legacy?: boolean;
}

export const Environments: IEnvironmentConfig[] = [
    {
        environmentName: 'Environment A',
        configPath: './config/private.a.json'
    }, {
        environmentName: 'Environment B',
        configPath: './config/private.b.json'
    }
];
