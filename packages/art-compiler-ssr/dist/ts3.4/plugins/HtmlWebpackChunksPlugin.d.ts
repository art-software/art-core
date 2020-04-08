interface IOptions {
    manifestPath: string;
}
export declare class HtmlWebpackChunksPlugin {
    constructor(options: IOptions);
    options: IOptions;
    apply(compiler: any): void;
    private htmlWebpackChunksPluginGenerateAssetsManifest;
}
export {};
//# sourceMappingURL=HtmlWebpackChunksPlugin.d.ts.map
