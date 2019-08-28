import ArtScaffold from '../ArtScaffold';
import { ProjectScaffold, ModuleScaffold } from '../index';

class MiniprogramScaffold extends ArtScaffold {
  constructor(scaffoldData: ProjectScaffold | ModuleScaffold, scaffoldType: string) {
    super((scaffoldData as ProjectScaffold).projectName || '', scaffoldType);

    // override
    this.scaffoldsAvailable = ['miniprogram/default'];
    this.scaffoldChoosen = 'miniprogram/default';

    this.setProjectName((scaffoldData as ProjectScaffold).projectName || '');
    this.setProjectDescription((scaffoldData as ProjectScaffold).projectDescription || '');
    this.setProjectVirtualPath((scaffoldData as ProjectScaffold).projectVirtualPath);
    this.setModuleName(scaffoldData.moduleName);
  }
}

module.exports = MiniprogramScaffold;