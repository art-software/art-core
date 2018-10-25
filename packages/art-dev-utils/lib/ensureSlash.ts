const ensureSlash = (rawPath: string, needsSlash: boolean): string => {
  rawPath = rawPath || '';
  const hasSlash = rawPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return rawPath.substr(0, rawPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${rawPath}/`;
  } else {
    return rawPath;
  }
};

export default ensureSlash;