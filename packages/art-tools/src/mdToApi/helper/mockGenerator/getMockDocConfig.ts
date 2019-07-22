import path from 'path';
import { walk } from 'art-dev-utils/lib/fileHelper';
import { IDocToMockConfig } from '../interface/mockGenerator';

export const getModuleDocToMockConfig: (folderPath: string) => IDocToMockConfig[] = (folderPath) => {
  const docConfig: IDocToMockConfig[] = [];
  walk(folderPath).forEach((file) => {
    if (path.extname(file) === '.md') {
      const entry = path.relative(process.cwd(), file);
      const fileConfig: IDocToMockConfig = {
        entry,
        output: getOutputMockPath(entry)
      };
      docConfig.push(fileConfig);
    }
  });
  return docConfig;
};

export const getOutputMockPath: (entryPath: string) => string = (entryPath) => {
  let outputPath = entryPath.replace('client', 'mock');
  outputPath = outputPath.replace('/services/api-docs', '');
  outputPath = outputPath.replace('.md', 'Controller.ts');
  return outputPath;
};