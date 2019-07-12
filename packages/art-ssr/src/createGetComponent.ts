import createVM from './createVM';
import fs from 'fs';
import has from 'has';

export default (files: { [key: string]: string }, vmOptions?) => {
  const fileEntries = Object.entries(files);

  const vm = createVM({
    cacheSize: fileEntries.length,
    ...vmOptions
  });

  const resolvedFiles = fileEntries.reduce((components, [fileName, filePath]) => {
    const code = fs.readFileSync(filePath, 'utf-8');

    try {
      // Load the bundle on startup so we can cache its exports.
      vm.run(filePath, code);

      // Cache the code as well as the path to it.
      components[fileName] = {
        filePath,
        code
      };
    } catch (err) {
      // If loading the component failed then we'll skip it.
      // istanbul ignore next
      console.error(err.stack);
    }

    return components;
  }, {});

  return (name) => {
    if (has(resolvedFiles, name)) {
      const { filePath, code } = resolvedFiles[name];
      return vm.run(filePath, code);
    }

    // The requested package was not found.
    return null;
  };
};