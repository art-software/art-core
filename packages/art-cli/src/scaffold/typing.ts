interface SyncMappingOption {
  operation: 'copy' | 'transform';
  rename?: string;
  handler?: () => any;
}

export interface SyncMapping {
  [key: string]: SyncMappingOption;
}

export interface TplMapping extends SyncMappingOption {
  name: string;
  from: string;
  to: string;
}