import { isObject } from './lang';
import get from './get';

export default class EnvBase {
  public getEnvName(): any {
    return undefined;
  }

  public get(key: string, envName?: string) {
    return this.getFromSource(this, key, envName);
  }

  public getFromSource(source: any, key: string, envName?: string): string | undefined {
    envName = envName || this.getEnvName() || 'prod';
    if (!key) {
      throw new Error('the `key` is required!');
    }
    const keyValues = get(source, `${key}`, undefined);

    if (isObject(keyValues)) {
      return get(keyValues, `${envName}`, undefined) || keyValues;
    }

    return keyValues;
  }
}