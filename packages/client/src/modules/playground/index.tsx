import React from 'react';
import { render } from 'react-dom';
import './styles';

class App extends React.Component {

  public render() {
    return (
      <div className="main">
        <div className="text">hello world</div>
        <div className="image" />
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));