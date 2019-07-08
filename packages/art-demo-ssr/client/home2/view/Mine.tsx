import React from 'react';

export default class Mine extends React.Component {
  public login() {
    console.log('login');
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
      <div>
        <div>Mine Page</div>
        <button style={style} onClick={this.login}>Login</button>
      </div>
    );
  }
}