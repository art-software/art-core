/**
 * 拿到删除的模块，拼接路径，删除client，mock，更新art.config.js
 * @param {Object} moduleEntry  modules to be removed.  eg:{demo/spa/my/invest/22: ["./client/my/invest/22/index.tsx"]}
 * @param {Boolean} removeDebug remove debug path folders or not
 * @param {Boolean} removePublic remove public path folders or not
 */
export declare const removeFolders: (moduleEntry: object, removeDebug: boolean, removePublic: boolean) => void;
/**
 *
 * @param {String} projectVirtualPath 'demo/spa
 * @param paths
 */
export declare const remove: (projectVirtualPath: String, ...paths: string[]) => void;
//# sourceMappingURL=removeModules.d.ts.map
