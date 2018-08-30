import chalk from 'chalk';

const printInstructions = (appName, urls)  => {
  console.log(`You can now view ${chalk.bold(appName)} in the browser.`);
  console.log();

  if (urls.lanUrlForTerminal) {
    console.log(
      `  ${chalk.bold('Local:')}            ${urls.localUrlForTerminal}`
    );
    console.log(
      `  ${chalk.bold('On Your Network:')}  ${urls.lanUrlForTerminal}`
    );
  } else {
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

export default printInstructions;