export const removeJsonKeyQuotes: (transformBbj) => string = (transformBbj) => {
  if (typeof transformBbj !== 'object') {
    // not an object, stringify using native function
    return JSON.stringify(transformBbj);
  }
  if (Array.isArray(transformBbj)) {
    const arrayString = transformBbj.map((value) => {
      return removeJsonKeyQuotes(value);
    }).join(`, `);
    return `[${arrayString}]`;
  }
  // Implements recursive object serialization according to JSON spec
  // but without quotes around the keys.
  const props = Object
  .keys(transformBbj)
    .map((key) => `${key}: ${removeJsonKeyQuotes(transformBbj[key])}`)
    .join(`, `);
  return `{ ${props} }`;
};