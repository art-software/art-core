export interface ICollapseProps {
  title: JSX.Element | string;
  isCollapse?: boolean;
  className?: string;
  animationCallback?: () => void; // 动画结束后的回调函数
}