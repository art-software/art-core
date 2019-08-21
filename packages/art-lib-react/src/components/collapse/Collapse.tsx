// 折叠面板单元
import React from 'react';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';
import { ICollapseProps } from './propTypes';
import './styles/collapse.less';
import { getElemHeight } from 'art-lib-utils/dist/utils/dom';
import { raf } from 'art-lib-utils/dist/utils/raf';

export default class Collapse extends CoreComponent<ICollapseProps, any>{
  constructor(props, context) {
    super(props, context);
  }

  public contentRef: any = React.createRef();

  public static defaultProps = {
    isCollapse: true
  };

  public state = {
    isCollapse: this.props.isCollapse,
    animateElementStyle: {
      height: this.props.isCollapse ? 0 : undefined
    }
  };

  public toggleCollapse = () => {
    const { isCollapse } = this.state;
    this.setState({ isCollapse: !isCollapse });

    raf(() => {
      const contentHeight = getElemHeight(this.contentRef.current);
      if (contentHeight > 0) {
        const animateElementHeight = `${contentHeight}px`;
        this.setState({
          animateElementStyle: {
            height: isCollapse ? 0 : animateElementHeight
          }
        });
        raf(() => {
          this.setState({
            animateElementStyle: {
              height: isCollapse ? animateElementHeight : 0
            }
          });
        });
      } else {
        this.onTransitionEnd();
      }
    });
  }

  public onTransitionEnd = () => {
    const { animationCallback } = this.props;
    if (animationCallback) { animationCallback(); }
  }

  public render() {
    const { title, children, className } = this.props;
    const { isCollapse, animateElementStyle } = this.state;
    return (
      <div className={this.classNames('art-collapse', className)}>
        <div className="collapse-title-wrapper" onClick={this.toggleCollapse}>
          {
            typeof title === 'string' ? (
              <div className="collapse-title">
                {title}
                <div className={this.classNames('collapse-arrow-wrapper', { rotate: !isCollapse })} >
                  <div className="collapse-arrow"></div>
                </div>
              </div>
            ) : title
          }
        </div>
        <div className="collapse-content-wrapper" style={animateElementStyle} onTransitionEnd={this.onTransitionEnd}>
          <div className="collapse-content" ref={this.contentRef}>
            {children}
          </div>
        </div>
      </div>
    );
  }
}