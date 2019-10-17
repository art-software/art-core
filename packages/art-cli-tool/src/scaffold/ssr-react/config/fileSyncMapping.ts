import { SyncMapping } from '../../typing';
import ArtScaffold from '../../ArtScaffold';

export const ignoreMapping = (scaffoldInstance: ArtScaffold): SyncMapping[] => {
  return [
    {
      name: '.artignore',
      rename: '.gitignore'
    }
  ];
};