import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { ISpinnerProps } from './propTypes';
import './styles';

const CLASS_NAME = 'v-spinner';

export default class Spinner extends CoreComponent<ISpinnerProps, any> {

  public static defaultProps = {
    isOpen: true,
    circleColor: 'rgb(201, 201, 201)',
  };

  private buildClassName = (additional: string) => {
    return this.classNames({
      [`${CLASS_NAME}-${additional}`]: additional
    });
  }

  public render() {
    const { isOpen, className, style, circleColor, children } = this.props;
    const spaceClassName = this.classNames(`${CLASS_NAME}`, className);
    return (
      isOpen && <div className={spaceClassName} style={style}>
        <div className={this.buildClassName('block')} >
          {
            children || <span className={this.buildClassName('rotate')}>
              <svg className={this.buildClassName('circular')} viewBox="25 25 50 50">
                <circle style={{ stroke: circleColor }} cx="50" cy="50" r="20" fill="none" />
              </svg>
            </span>
          }
        </div>
      </div>
    );
  }
}
