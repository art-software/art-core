import ArtScaffold from '../ArtScaffold';
import { ProjectScaffold, ModuleScaffold } from '../index';

class SSRReactScaffold extends ArtScaffold {
  constructor(scaffoldData: ProjectScaffold | ModuleScaffold, scaffoldType: string) {
    super((scaffoldData as ProjectScaffold).projectName || '', scaffoldType);

    // override
    this.scaffoldsAvailable = ['ssr/react'];
    this.scaffoldChoosen = 'ssr/react';

    this.setProjectName((scaffoldData as ProjectScaffold).projectName || '');
    this.setProjectDescription((scaffoldData as ProjectScaffold).projectDescription || '');
    this.setProjectVirtualPath((scaffoldData as ProjectScaffold).projectVirtualPath);
    this.setModuleName(scaffoldData.moduleName);
  }
}

module.exports = SSRReactScaffold;