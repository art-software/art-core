interface Args {
    modules: string;
    port?: string;
}
export declare const webpackTask: (command: "build" | "serve", args: Args) => Promise<void>;
export declare const webpackDll: () => void;
export {};
//# sourceMappingURL=webpackTask.d.ts.map
