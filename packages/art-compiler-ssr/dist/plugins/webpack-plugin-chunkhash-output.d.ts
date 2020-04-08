import { Tapable } from 'tapable';
import { Compiler } from 'webpack';
export default class OutputHash implements Tapable.Plugin {
    constructor({ validateOutput, validateOutputRegex, hashDigestLength, version, enableBundleHashName }?: {
        validateOutput?: boolean | undefined;
        validateOutputRegex?: RegExp | undefined;
        hashDigestLength?: number | undefined;
        version?: string | undefined;
        enableBundleHashName?: boolean | undefined;
    });
    validateOutput: boolean;
    validateOutputRegex: RegExp;
    hashDigestLength: number;
    version: string;
    enableBundleHashName: boolean;
    chunkGroups: any[];
    apply(compiler: Compiler): void;
    /**
     * Computes the new hash of a chunk by chunk.files that matched .(js|css)
     *
     * We assume that the content of bundle.css, bundle.js don't need `chunkhash` variable
     * We only need to caculate the `newHash` of the concat content of (bundle.js + bundle.css) and
     * replace the corresponding pathname of chunk.files[] and assets key.
     *
     */
    private reHashChunk;
    private concatContentInAsset;
}
//# sourceMappingURL=webpack-plugin-chunkhash-output.d.ts.map