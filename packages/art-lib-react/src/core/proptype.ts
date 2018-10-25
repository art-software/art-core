export interface IComponentProps {
  className?: string;
  style?: object;
  ref?: (node) => void;
}

export interface IOptionProps {
  fnName?: string;
  enabled?: boolean;
  message?: string;
  errorHandler?: (errorReport: any) => void;
}