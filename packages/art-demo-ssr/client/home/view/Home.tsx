import React from 'react';
import '../styles/home.less';

const iconPath = require('../assets/icon-home.png');

export default class Home extends React.Component {
  public state = {
    count: 0
  };

  public count = () => {
    this.setState({
      count: ++this.state.count
    });
  }

  public render() {
    const style = {
      display: 'inline-block',
      width: '100px',
      height: '60px',
      border: 'none',
      marginRight: '20px'
    };
    return (
      <div className="home">
        <div>It's React SSR</div>
        <button style={style} onClick={this.count}>Click to Add: {this.state.count}</button>
        <div className="home-background"></div>
        <img src={iconPath} alt="icon-home"/>
      </div>
    );
  }
}