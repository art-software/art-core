import detect from 'detect-port';
import { warningText, redText } from './chalkColors';
import isRoot from 'is-root';
import clearConsole from './clearConsole';

const isInteractive = process.stdout.isTTY;
const choosePort = (host: string, defaultPort: number) => {
  return detect(defaultPort)
    .then((port): number | null => {
      if (port === defaultPort) { return defaultPort; }

      const message =
        process.platform !== 'win32' && defaultPort < 1024 && !isRoot()
          ? `Admin permissions are required to run a server on a port below 1024.`
          : `Something is already running on port ${defaultPort}.`;

      if (isInteractive) {
        // clearConsole();
        console.log(1111, port, defaultPort);
        return port;
      } else {
        console.log(redText(message));
        return null;
      }
    })
    .catch((error) => {
      throw new Error(
        warningText(`Could not find an open port at ${host}.\n
        Network error message: ${ error.message}`)
      );
    });
};

export default choosePort;