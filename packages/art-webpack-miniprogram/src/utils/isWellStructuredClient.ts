
// check whether client root folder contains necessary files for a valid miniprogram structure.
import paths from '../config/paths';
import { existsSync } from 'fs';
import { join } from 'path';
import { APPJSON, APPJS, APPTS } from '../constants/FileNames';

const clientRootContains = (fileName: string): boolean => {
  const clientPath = paths.appSrc;
  return existsSync(join(clientPath, fileName));
};

export const isWellStructuredClient = (): boolean => {

  if (!clientRootContains(APPJSON)) { return false; }

  if (!clientRootContains(APPJS) && !clientRootContains(APPTS)) { return false; }

  return true;
};