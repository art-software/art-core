import React from 'react';
import './style';
import CoreComponent from '../../core/CoreComponent';
import viewport from 'art-lib-utils/dist/utils/viewport';
const px2rem = viewport.px2rem;
const currRem = viewport.currRem;
const px2px = (value) => {
    return Math.ceil(Number(px2rem(value).split('rem')[0]) * currRem) + 'px';
};
const ProgressLabel = (props) => {
    const { hide, style, value } = props;
    if (hide) {
        return null;
    }
    return (<div className="label" style={style}>
      {value}
      <span className="smaller">%</span>
    </div>);
};
export default class Progress extends CoreComponent {
    render() {
        const { value = 0, hideLabel = false, size = 200, gap = 12, toFixed = 0, color = '#169fe6', shadowColor = '#bdc3c7', fontSize = 50, fontColor = '#bdc3c7', labelBg = '#fff' } = this.props;
        const val = (value * 100).toFixed(toFixed);
        const rotate = value * 360;
        const pos = px2px(size);
        const wrapperStyle = {
            width: pos,
            height: pos
        };
        const pieStyle = {
            clip: 'rect(0, ' + px2px(size) + ', ' + px2px(size) + ', ' + px2px(size / 2) + ')'
        };
        const barLeftStyle = {
            WebkitTransform: `rotate(${rotate}deg)`,
            transform: `rotate(${rotate}deg)`,
            borderColor: color,
            borderWidth: px2px(gap),
            clip: 'rect(0, ' + px2px(size / 2) + ', ' + px2px(size) + ', 0)'
        };
        const barRightStyle = {
            borderColor: color,
            borderWidth: px2px(gap),
            clip: 'rect(0, ' + px2px(size / 2) + ', ' + px2px(size) + ', 0)'
        };
        const shadowStyle = {
            borderColor: shadowColor,
            borderWidth: px2px(gap)
        };
        const labelStyle = {
            color: fontColor,
            backgroundColor: labelBg,
            lineHeight: px2px(size - fontSize / 4 - gap * 2),
            fontSize: px2px(fontSize),
            top: px2px(gap),
            right: px2px(gap),
            bottom: px2px(gap),
            left: px2px(gap)
        };
        const isOver50 = rotate > 180 ? true : false;
        return (<div {...this.applyArgs('progress')} style={wrapperStyle} className={this.props.className}>
        <ProgressLabel style={labelStyle} value={val} hide={hideLabel}/>
        <div>{this.props.children}</div>
        <div className={this.classNames({ pie: true, over50: isOver50 })} style={pieStyle}>
          <div className="half-circle left-side" style={barLeftStyle}></div>
          <div className="half-circle right-side" style={barRightStyle}></div>
        </div>
        <div className="shadow" style={shadowStyle}></div>
      </div>);
    }
}
