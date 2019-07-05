import { Scaffolds } from "../enums/Scaffolds";

export const NpmModules = {
	[Scaffolds.react]: ['art-lib-common', 'art-lib-react', 'art-lib-utils', 'art-server-mock', 'art-webpack'],
	[Scaffolds.miniprogram]: ['art-lib-common', 'art-lib-react', 'art-lib-utils']
}