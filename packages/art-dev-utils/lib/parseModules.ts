const parseModules = (modules: string): string[] => {
  if (!modules) { return []; }
  const parsedModules = modules.split(/\s+|,/).filter((m) => {
    if (typeof m === 'string') { return true; }
  });

  return parsedModules;
};

export default parseModules;