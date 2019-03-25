import { cruise } from 'dependency-cruiser';
import paths from '../config/paths';
import { join } from 'path';

const isDevStage = process.env.STAGE === 'dev';

export const dependencyTree = (entry: string[]): string[] => {

  if (!entry.length) { return []; }

  const cruiseResult = cruise(
    entry,
    {
      outputType: 'json',
      preserveSymlinks: true
    }
  );

  const dependencies = JSON.parse(cruiseResult.modules).modules;

  return dependencies.filter((dependency) => {
    return dependency.coreModule !== true;
  }).map((notCoreDependency) => {
    let depPath = join(paths.appCwd, notCoreDependency.source);
    return depPath = isDevStage ? depPath.replace('packages', 'node_modules') : depPath;
  });
};