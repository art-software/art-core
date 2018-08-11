import * as path from 'path';
import * as fs from 'fs';

const appDirectory = fs.realpathSync(process.cwd());

export default function resolveAppPath(relativePath: string): string {
   return path.resolve(appDirectory, relativePath);
}