import React from 'react';
import CoreComponent from '../../core/CoreComponent';
import viewport from 'art-lib-utils/dist/utils/viewport';
import Animation from '../animation';
import { easeInOutQuad } from '../animation/easing';
import { shallowEqual } from 'art-lib-utils/dist/utils/shallow-compare';
export default class Lottery extends CoreComponent {
    constructor(props, context) {
        super(props, context);
        this.state = {
            rewards: [],
        };
        this.startedIndex = 0;
        this.startAnimation = () => {
            setTimeout(() => {
                const rewards = this.deepCloneReward(this.state.rewards);
                rewards[this.startedIndex++].start = true;
                this.setState({ rewards });
                if (this.startedIndex < this.state.rewards.length) {
                    this.startAnimation();
                }
            }, this.startedIndex * 300);
        };
        this.getRewards = (rewards) => {
            return this.deepCloneReward(rewards);
        };
        this.getRewardStyle = (rewardItem) => {
            const stepMoveDistance = parseFloat(viewport.px2DPIpx(rewardItem.stepMoveDistance));
            const dpiTotalHeight = stepMoveDistance * rewardItem.totalRewards;
            const initDistance = stepMoveDistance * rewardItem.startRewardIndex;
            return {
                height: stepMoveDistance,
                backgroundSize: `100% ${dpiTotalHeight}px`,
                backgroundPositionY: -initDistance
            };
        };
        this.setRewards = () => {
            const rewards = this.getRewards(this.props.rewards);
            rewards.forEach((reward) => {
                reward.style = this.getRewardStyle(reward);
            });
            this.setState({ rewards });
        };
        this.handleDelta = (progress) => {
            return this.props.easing(progress);
        };
        this.handleStep = (reward, index) => (delta) => {
            this.move(delta, reward, index);
        };
        this.handleComplete = (rewardItem, index) => () => {
            if (index >= this.state.rewards.length - 1) {
                this.resetGame();
                if (this.props.onFinished) {
                    this.props.onFinished();
                }
            }
        };
        window.addEventListener('resize', () => {
            this.setRewards();
        });
    }
    deepCloneReward(rewards) {
        const newRewards = [];
        rewards.forEach((reward) => {
            newRewards.push(Object.assign({}, reward));
        });
        return newRewards;
    }
    componentDidMount() {
        this.setRewards();
    }
    componentWillReceiveProps(nextProps) {
        if (shallowEqual(nextProps, this.props)) {
            return;
        }
        const oldRewards = this.deepCloneReward(this.state.rewards);
        const newRewards = this.getRewards(nextProps.rewards);
        newRewards.forEach((reward, index) => {
            this.mergeProps(true, oldRewards[index], newRewards[index]);
            oldRewards[index].style = this.getRewardStyle(oldRewards[index]);
        });
        this.setState({
            rewards: oldRewards
        }, () => {
            if (nextProps.start === true) {
                this.startAnimation();
            }
        });
    }
    move(delta, rewardItem, index) {
        const rewardStyle = this.getRewardStyle(rewardItem);
        const stepMoveDistance = parseFloat(viewport.px2DPIpx(rewardItem.stepMoveDistance));
        const circleDistance = stepMoveDistance * rewardItem.totalRewards * 5;
        const initDistance = stepMoveDistance * rewardItem.startRewardIndex;
        const endDistance = stepMoveDistance * rewardItem.endRewardIndex;
        const moveDistance = (circleDistance + endDistance - initDistance) * delta;
        const newRewards = this.deepCloneReward(this.state.rewards);
        newRewards[index].style = Object.assign(rewardStyle, {
            backgroundPositionY: -moveDistance - initDistance
        });
        this.setState({
            rewards: newRewards
        });
    }
    resetGame() {
        this.startedIndex = 0;
        const oldRewards = this.deepCloneReward(this.state.rewards);
        oldRewards.forEach((reward) => {
            reward.start = false;
            reward.startRewardIndex = reward.endRewardIndex;
            reward.style = this.getRewardStyle(reward);
        });
        this.setState({ rewards: oldRewards });
    }
    render() {
        const { duration, className } = this.props;
        return (<div {...this.applyArgs('games-lottery')} className={className}>
        {this.state.rewards.map((reward, index) => {
            return (<div className="lottery-rewards-wrapper" key={index}>
                <Animation style={reward.style} start={reward.start} duration={duration} className="tiger-lottery" onDelta={this.handleDelta} onStep={this.handleStep(reward, index)} onComplete={this.handleComplete(reward, index)}/>
              </div>);
        })}
      </div>);
    }
}
Lottery.defaultProps = {
    start: false,
    duration: 6000,
    rewards: [{
            // one reward height in (750px design draft)
            stepMoveDistance: 255,
            // start from 0
            startRewardIndex: 0,
            // start from 0
            endRewardIndex: 5,
            totalRewards: 9
        }],
    easing: easeInOutQuad,
    onFinished: () => { }
};
