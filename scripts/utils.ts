import * as os from 'os';

export const maxCpu = Math.max(1, os.cpus().length - 1);