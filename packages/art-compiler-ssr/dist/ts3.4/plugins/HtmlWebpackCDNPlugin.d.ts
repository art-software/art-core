import { Plugin } from 'webpack';
export default class HtmlWebpackCDNPlugin implements Plugin {
    apply(compiler: any): void;
    handleAssets(pluginData: any): {
        head: any;
        body: any[];
        plugin: any;
        chunks: any;
        outputName: any;
    };
}
//# sourceMappingURL=HtmlWebpackCDNPlugin.d.ts.map
