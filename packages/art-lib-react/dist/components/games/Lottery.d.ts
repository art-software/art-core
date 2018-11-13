import CoreComponent from '../../core/CoreComponent';
import { ILotteryProps } from './propstype';
export default class Lottery extends CoreComponent<ILotteryProps, any> {
    static defaultProps: {
        start: boolean;
        duration: number;
        rewards: {
            stepMoveDistance: number;
            startRewardIndex: number;
            endRewardIndex: number;
            totalRewards: number;
        }[];
        easing: (x: any) => number;
        onFinished: () => void;
    };
    state: {
        rewards: any;
    };
    private deepCloneReward;
    private startedIndex;
    private startAnimation;
    private getRewards;
    private getRewardStyle;
    componentDidMount(): void;
    private timeoutGetHeight;
    componentWillReceiveProps(nextProps: any): void;
    handleDelta: (progress: any) => any;
    handleStep: (reward: any, index: any) => (delta: any) => void;
    move(delta: any, rewardItem: any, index: any): void;
    handleComplete: (rewardItem: any, index: any) => () => void;
    private resetGame;
    render(): any;
}
