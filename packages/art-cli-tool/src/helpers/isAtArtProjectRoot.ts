import { join } from 'path';
import { FileNames } from '../constants/FileNames';
import { existsSync } from 'fs';

const artConfigFilePath =  join(process.cwd(), FileNames.ARTCONFIGFILE);

export const isAtArtProjectRoot = (): boolean => {
  return existsSync(artConfigFilePath);
};