// interface SyncMappingOption {
//   operation: 'copy' | 'transform';
//   rename?: string;
//   handler?: () => any;
// }

// export interface SyncMapping {
//   [key: string]: SyncMappingOption;
// }

export interface SyncMapping {
  name: string;
  fileFrom?: string;
  fileTo?: string;
  operation?: 'copy' | 'transform';
  rename?: string;
  // handler?: () => any;
  replace?: Array<{ from: string | RegExp, to: string }>;
}