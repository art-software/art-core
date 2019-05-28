import chalk from 'chalk';

const printInstructionsMiniprogram = (appName, urls)  => {
  console.log(`You can now view ${chalk.bold(appName)} in Wechat Miniprogram IDE.`);

  if (urls.lanUrlForTerminal) {
    console.log(`Wechat Miniprogram mock server url: `);
    console.log();
    console.log(
      `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`
    );
    console.log(
      `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`
    );
  } else {
    console.log();
    console.log(`  ${urls.localUrlForTerminal}`);
  }

  console.log();
  // console.log('Note that the development build is not optimized.');
  console.log(
    `To create a production build, use ` +
    `${chalk.cyan(`art build`)}.`
  );
  console.log();
};

export default printInstructionsMiniprogram;