export class DependencyMapping {

  private static mapping: Map<string, string[]> = new Map();

  public static getAllMapping = () => {
    return DependencyMapping.mapping;
  }

  public static getMapping = (filePath: string) => {
    return DependencyMapping.mapping.get(filePath);
  }

  public static setMapping = (filePath: string, dependencies: string[]) => {
    if (!DependencyMapping.needUpdate(filePath, dependencies)) {
      return DependencyMapping.mapping;
    }
    if (dependencies.length === 0) {
      return DependencyMapping.deleteMapping(filePath);
    }

    return DependencyMapping.mapping.set(filePath, dependencies);
  }

  public static needUpdate = (filePath: string, dependencies: string[]) => {
    const mapping = DependencyMapping.mapping;
    const currentMapping = mapping.get(filePath) || [];
    if (currentMapping.length !== dependencies.length) {
      return true;
    }

    for (let i = 0, len = currentMapping.length; i < len; i++) {
      if (!dependencies.includes(currentMapping[i])) {
        return true;
      }
    }

    return false;
  }

  public static deleteMapping = (filePath: string) => {
    DependencyMapping.mapping.delete(filePath);
    return DependencyMapping.mapping;
  }
}
