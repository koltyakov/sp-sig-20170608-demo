export interface IEnvironmentConfig {
    environmentName: string;
    configPath: string;
}

export const environment: IEnvironmentConfig = {
    environmentName: 'SharePoint Online',
    configPath: './config/private.spo.json'
};
