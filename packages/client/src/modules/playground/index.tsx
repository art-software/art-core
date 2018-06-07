import React from 'react';
import { render } from 'react-dom';
import './style.less';

class App extends React.Component {

  public render() {
    return <div className="main">hello world</div>;
  }
}

render(<App />, document.getElementById('app'));