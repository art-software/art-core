import { Plugin, Compiler } from 'webpack';
import { dirname } from 'path';

export default class DynamicChunkNamePlugin implements Plugin {
  constructor(moduleEntry) {
    this.moduleEntry = moduleEntry;
  }
  public moduleEntry: object;

  public apply(compiler: Compiler): void {
    compiler.hooks.compilation.tap('DynamicChunkNamePlugin', (compilation) => {
      compilation.hooks.beforeChunkIds.tap('DynamicChunkNamePlugin', (chunks) => {
        chunks.forEach((chunk) => {
          if (chunk.name) { return; }
          const moduleEntries = chunk.getModules();
          const nodeModulesRegex = /node_modules/;
          for (const mod of moduleEntries) {
            for (const entry in this.moduleEntry) {
              const entryRegex = this.getEntryRegex(this.moduleEntry[entry][0]);
              if (entryRegex.test(mod.context) || nodeModulesRegex.test(mod.context)) {
                const newChunkName = entry + '/chunks';
                chunk.id = `${newChunkName}/${this.getRandomString()}`;
              }
            }
          }
        });
      });
    });
  }

  public getEntryRegex(entry: string): RegExp {
    let entryDir = dirname(entry);
    if (entryDir.startsWith('./')) {
      entryDir = entryDir.slice(2);
    }
    return new RegExp(`${entryDir}`);
  }

  public getRandomString() {
    return Math.random().toString(36).substr(2, 9) + '_' + Date.now();
  }

}