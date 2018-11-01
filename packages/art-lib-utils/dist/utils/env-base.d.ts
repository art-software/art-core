export default class EnvBase {
    getEnvName(): any;
    get(key: string, envName?: string): string | undefined;
    getFromSource(source: any, key: string, envName?: string): string | undefined;
}
