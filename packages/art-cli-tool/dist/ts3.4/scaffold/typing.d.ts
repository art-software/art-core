export interface SyncMapping {
    name: string;
    fileFrom?: string;
    fileTo?: string;
    operation?: 'copy' | 'transform';
    rename?: string;
    replace?: Array<{
        from: string | RegExp;
        to: string;
    }>;
}
//# sourceMappingURL=typing.d.ts.map
