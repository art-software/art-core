
// check whether client root folder contains necessary files for a valid miniprogram structure.
import paths from '../config/paths';
import { existsSync } from 'fs';
import { join } from 'path';
import { APPJSON, APPJS, APPTS } from '../constants/FileNames';
import chalk from 'chalk';

const clientRootContains = (fileName: string): boolean => {
  const clientPath = paths.appSrc;
  return existsSync(join(clientPath, fileName));
};

export const isWellStructuredClient = (): boolean => {

  if (!clientRootContains(APPJSON)) {
    throw new Error(`${chalk.red(
      `Invalid miniprogram client structure, file ${APPJSON} not found in client root`
    )}`);
  }

  if (!clientRootContains(APPJS) && !clientRootContains(APPTS)) {
    throw new Error(`${chalk.red(
      `Invalid miniprogram client structure, file ${APPJS} or ${APPTS} not found in client root`
    )}`);
  }

  return true;
};