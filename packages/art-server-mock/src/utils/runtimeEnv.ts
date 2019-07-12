import { join } from 'path';
import { ProjectTypes } from '../enums/ProjectTypes';

// @ts-ignore
const configPath = join(process.cwd(), 'art.config.js');
const artConfig = require(configPath);
export const isWxMiniprogramEnv = artConfig.projectType === ProjectTypes.miniprogram;
export const isSSRProject = artConfig.projectType === ProjectTypes.SSR;