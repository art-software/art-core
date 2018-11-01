// We can't create an unique seed instance.
export const uniqueFactory = (prefix = 'unique', start = 1) => {
  // start with 1
  const uniqueMap = { unique: start };
  return () => {
    if (!uniqueMap[prefix]) { uniqueMap[prefix] = start; }
    return `${prefix}${uniqueMap[prefix]++}`;
  };
};

// global shared one seed instance.
export default uniqueFactory();