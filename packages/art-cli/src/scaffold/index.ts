import inquirer from 'inquirer';

export interface ProjectScaffold {
  projectName: string;
  projectDescription: string;
  projectVirtualPath: string;
  moduleName: string;
}

export interface ModuleScaffold {
  moduleName: string;
}

/**
 * create new art project configuration
 *
 * @param {String} scaffoldType react|vue
 * @param {String} commandType  project|module
 * @param {Object} scaffoldData ProjectScaffold | ModuleScaffold
 */
export const create = (scaffoldType: string, commandType: string, scaffoldData: ProjectScaffold | ModuleScaffold) => {
  const method = commandType === 'project' ? 'createScaffoldProject' : 'createScaffoldModule';
  console.log(`scaffoldType: ${scaffoldType}`);
  const Scaffold = require(`./${scaffoldType}`);
  const scaffold = new Scaffold(scaffoldData, scaffoldType);

  inquirer.prompt([
    {
      type: 'list',
      name: 'scaffoldChoosen',
      choices: scaffold.getScaffoldsAvailable(),
      message: 'What scaffold do you want to choice?'
    }
  ])
  .then((answer: any) => {
    scaffold.setScaffoldChoosen(answer.scaffoldChoosen);
    scaffold[method]();
  });
};