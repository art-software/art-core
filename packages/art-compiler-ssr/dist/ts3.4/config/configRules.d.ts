import { RuleSetRule } from 'webpack';
export declare const configBaseRules: () => RuleSetRule[];
export declare const cssRule: (isProdEnv: boolean, isSSR?: boolean | undefined) => RuleSetRule;
export declare const lessRule: (isProdEnv: boolean, isSSR?: boolean | undefined) => RuleSetRule;
export declare const sassRule: (isProdEnv: boolean, isSSR?: boolean | undefined) => RuleSetRule;
export declare const htmlRule: RuleSetRule;
export declare const assetsRule: RuleSetRule;
export declare const assetsRuleSSR: () => RuleSetRule;
export declare const fontRule: RuleSetRule;
export declare const jsRule: RuleSetRule;
export declare const tsRule: RuleSetRule;
export declare const nullRule: RuleSetRule;
//# sourceMappingURL=configRules.d.ts.map
