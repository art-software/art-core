import CoreComponent from '../../core/CoreComponent';
import { IAnimation } from './propstype';
export default class Animation extends CoreComponent<IAnimation, any> {
    private running;
    static defaultProps: {
        start: boolean;
        delay: number;
        duration: number;
        onStep: (delta: number) => void;
        onDelta: (progress: number) => number;
        onComplete: () => void;
    };
    componentDidMount(): void;
    componentDidUpdate(prevProps: any): void;
    private handleAnimateComplete;
    private execute;
    render(): JSX.Element;
}
