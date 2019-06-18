export interface ISimpleButtonProps {
  isDisabled?: boolean; // 按钮是否不可点击
  hasClickFeedback?: boolean; // 是否有点击反馈效果
  className?: string;
  onClick?: () => void;
}
