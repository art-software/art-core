import { ModulesManagers } from "../enums/ModulesManagers";

export const InstallCommands = {
	[ModulesManagers.YARN]: {
		default: 'install',
		particular: 'add',
		options: []
	},
	[ModulesManagers.NPM]: {
		default: 'install',
		particular: 'install',
		options: []
	},
}