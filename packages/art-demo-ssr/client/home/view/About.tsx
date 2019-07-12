import React from 'react';
import '../styles/about.less';
const imagePath = require('../assets/img-tree.jpg');

export default class About extends React.Component {

  public render() {
    return <div className="about">
      <span>About Page</span>
      <img src={imagePath} alt="tree"/>
    </div>;
  }
}