import { CommandModule, Argv } from 'yargs';
import chalk from 'chalk';
import { Equipments } from '../enums/Equipments';
import inquirer, { Questions, Answers } from 'inquirer';
import parseModules from 'art-dev-utils/lib/parseModules';
import path from 'path';
import fs from 'fs-extra';
import recast from 'recast';
import { VariableDeclarator, Identifier, ObjectExpression, Property, Literal } from 'ast-types/gen/nodes';
import { VariableDeclaration } from 'estree';

const equipments = [Equipments.ServiceWorker];

class EquipCommand implements CommandModule {

  public readonly command = 'equip';

  public describe = chalk.black.bold(`equip existing modules with ${equipments.join(',')}`);

  public builder(argv: Argv): Argv {
    return argv
      .usage(`\n${chalk.cyan.bold('Usage:')} $0 equip [options]`)
      .option('m', {
        alias: 'modules',
        demandOption: true,
        describe: chalk.black.bold('The modules you would like to equip')
      })
      .updateStrings({
        'Invalid values:': chalk.red.bold('Invalid values:')
      })
      .help();
  }

  public handler(argv): void {
    const questions: Questions = [{
      type: 'list',
      name: 'equipment',
      choices: equipments,
      message: chalk.white('Which equipment you would like to choice?')
    }];

    inquirer.prompt(questions).then((answers: Answers) => {
      const modules = parseModules(argv.modules);
      const equipment = answers.equipment.replace(/\s+/g, '-');
      modules.forEach((module) => {
        equipModule(module, equipment);
      });
    });
  }
}

const equipModule = (module: string, equipment: string) => {
  const equipmentFrom = path.join(__dirname, '../../templates/equipments', equipment);
  const equipmentTo = path.join(process.cwd(), equipment);
  copyEquipment(equipmentFrom, equipmentTo);
  modifyArtConfigFile();
};

const copyEquipment = (from, to) => {
  fs.copy(from, to).then(() => {
    console.log(chalk.green('  Copy equipment files success!'));
  });
};

const modifyArtConfigFile = () => {
  const artConfigFilePath = path.resolve(process.cwd(), 'art.config.js');
  fs.readFile(artConfigFilePath)
    .then((contents) => {
      const source = contents.toString();
      const ast = recast.parse(source, { tokens: false });

      // 修改 dll.vendors
      recast.visit(ast, {
        visitProperty(astPath) {
          const property = astPath.node;
          const propertyKey = property.key as Identifier;

          if (propertyKey.name === 'dll') {
            // tslint:disable-next-line:no-eval
            const dll = eval('(' + recast.print(property.value).code + ')');
            const vendors = [
              'polyfills',
              'react',
              'react-dom',
              'react-router-dom',
              'classnames',
              'axios',
              'workbox-window',
              'art-lib-react/src/components/scroll/lib/iscroll-probe'
            ];
            dll.vendors = [...new Set(dll.vendors.concat(vendors))];
            const dllAst = recast.parse(`const dll = ${JSON.stringify(dll)}`, { tokens: false });
            property.value = ((dllAst.program.body[0] as VariableDeclaration)
              .declarations[0] as VariableDeclarator)
              .init as ObjectExpression;
          }

          this.traverse(astPath);
        }
      });

      // 添加 service worker config
      recast.visit(ast, {
        visitVariableDeclarator(astPath) {
          const variableDeclarator = astPath.node;
          const variableDeclaratorId = variableDeclarator.id as Identifier;

          if (variableDeclaratorId.name === 'artConfig') {
            const variableDeclaratorInit = variableDeclarator.init as ObjectExpression;
            const swConfigProperties = variableDeclaratorInit.properties.filter((property: Property) => {
              return (property.key as Literal).value === 'sw';
            });
            if (swConfigProperties.length === 0) {
              const serviceWorkerConfig = {
                sw: {
                  enable: true,
                  includeModules: [], // 需要使用service worker的模块
                  workboxOutputDirectory: 'workbox', // 存放service worker相关文件的目录名
                  workboxGenerateSWOptions: {
                    // include: [/\.html$/],
                    runtimeCaching: [
                      {
                        urlPattern: /art_framework\.\w+\.js$/,
                        handler: 'CacheFirst',
                        options: {
                          cacheName: 'vendors-runtime-cache',
                          expiration: {
                            maxEntries: 2,
                            maxAgeSeconds: 15 * 24 * 60 * 60
                          }
                        }
                      }
                    ]
                  }
                }
              };
              const swConfigAst = recast.parse(`const swConfig = ${JSON.stringify(serviceWorkerConfig)}`, { tokens: false });
              const swConfigProperty = (((swConfigAst.program.body[0] as VariableDeclaration)
                .declarations[0] as VariableDeclarator)
                .init as ObjectExpression)
                .properties[0] as Property;
              variableDeclaratorInit.properties.push(swConfigProperty);
            }
          }

          this.traverse(astPath);
        }
      });

      const target = recast.prettyPrint(ast, { tabWidth: 2, quote: 'single' }).code;

      fs.writeFile(artConfigFilePath, target).then(() => {
        console.log(chalk.green('  Modify art.config.js file finished!'));
      });
    });
};

module.exports = new EquipCommand();