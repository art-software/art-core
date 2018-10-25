const parseModules = (modules: string): string[] => {
  const parsedModules = modules.split(/\s+|,/).filter((m) => {
    if (typeof m === 'string') { return true; }
  });

  return parsedModules;
};

export default parseModules;