import { Plugin, Compiler } from 'webpack';
import ensureSlash from 'art-dev-utils/lib/ensureSlash';

interface OutputOptions {
  match: string;
  path: string;
  filename?: string;
}

export default class OutputRedirectPlugin implements Plugin {

  constructor(outputOptions: OutputOptions) {
    this.options = outputOptions;
  }

  private options: OutputOptions;

  public apply(compiler: Compiler): void {
    const { match, path, filename } = this.options;
    compiler.hooks.thisCompilation.tap('OutputRedirectPlugin', (compilation) => {
      compilation.hooks.beforeChunkIds.tap('OutputRedirectPlugin', (chunks) => {
        chunks.forEach((chunk) => {
          if (chunk.name === match) {
            if (chunk.id === null) {
              chunk.id = ensureSlash(path, true) + (filename || chunk.name);
            } else {
              throw new Error('This chunk\'s id has been assigned, can not reassign.');
            }
          }
        });
      });
    });
  }
}