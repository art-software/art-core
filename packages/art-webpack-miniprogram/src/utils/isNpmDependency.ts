export const isNpmDependency = (path: string) => {
  const regex = /node_modules/g;
  return regex.test(path);
};