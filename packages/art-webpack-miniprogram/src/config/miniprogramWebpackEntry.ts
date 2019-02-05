// miniprogram project only has one webpack entry;
import appConfig from './appConfig';

export const miniprogramWebpackEntry = (): { entry: object, entryKey: string, entryValue: string } => {
  const entry = appConfig.get('art:webpack:entry');
  return {
    entry,
    entryKey: Object.keys(entry)[0],
    entryValue: entry[Object.keys(entry)[0]]
  };
};