import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  public render() {
    const a: number  = 123;
    return <div>hello world: { a }</div>;
  }
}

render(<App />, document.getElementById('app'));