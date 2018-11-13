export interface ILotteryProps {
  start?: boolean;
  duration?: number;
  rewards: Array<{
    stepMoveDistance: number;
    startRewardIndex: number;
    endRewardIndex: number;
    totalRewards: number;
  }>;
  easing?: any;
  onFinished?: () => void;
}