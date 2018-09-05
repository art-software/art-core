import recursive from 'recursive-readdir';

function measureFileSizesBeforeBuild(buildFolder: string) {
  return new Promise((resolve) => {
    recursive(buildFolder, (error, files) => {

    });
  });
}