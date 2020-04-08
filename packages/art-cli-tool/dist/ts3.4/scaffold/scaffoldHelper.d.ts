import { SyncMapping } from './typing';
/**
 * Copy specificed files to location.
 * @param {String} filesFromCwd filesFrom location base.
 * @param {Array} filesFrom absolute [filepath]
 * @param {String} dirCopyTo the distination base
 * @param {Function(copyTo)} fileHandler how to handle each destination file .
 *
 * @return Promise all distination file path.
 */
export declare const execCopyFilesTo: (tplsMappping: SyncMapping[]) => Promise<unknown>;
export declare const tplMappingAssembler: (syncMapping: SyncMapping[], scaffoldFrom: string, scaffoldTo: string) => SyncMapping[];
//# sourceMappingURL=scaffoldHelper.d.ts.map
