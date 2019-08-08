import path from 'path';
import fs from 'fs';
import { walk } from 'art-dev-utils/lib/fileHelper';
import md5 from 'blueimp-md5';
import { IDocManifest, IModuleDocConfig } from '../interface/interfaceGenerator';

export const getModuleDocToInterfaceConfig: (folderPath: string) => IModuleDocConfig = (folderPath) => {
  const docConfig: IDocManifest[] = [];
  walk(folderPath).forEach((file) => {
    if (path.extname(file) === '.md') {
      const entry = path.relative(process.cwd(), file);
      const fileConfig: IDocManifest = {
        entry,
        output: getOutputPath(entry),
        md5: md5(fs.readFileSync(entry, 'utf8'))
      };
      docConfig.push(fileConfig);
    }
  });
  const moduleDocConfig: IModuleDocConfig = {
    docConfig,
    docManiFestPath: path.join(folderPath, '/doc-manifest.json')
  };
  return moduleDocConfig;
};

export const getDocManifestInfo: (filePath: string) => IDocManifest[] = (filePath) => {
  let docManifestInfo: IDocManifest[] = [];
  if (fs.existsSync(filePath)) {
    docManifestInfo = JSON.parse(fs.readFileSync(filePath, 'utf8') || '[]');
  }
  return docManifestInfo;
};

export const getOutputPath: (entryPath: string) => string = (entryPath) => {
  let outputPath = entryPath.replace('api-docs', 'interfaces');
  outputPath = outputPath.replace('.md', '.ts');
  return outputPath;
};