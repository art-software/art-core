import React from 'react';
import MainPageService from '../services/MainPageService';

export default class ViewIndex extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.mainPageService = new MainPageService();
  }

  public mainPageService: MainPageService;

  public clickToRequest() {
    console.log('click to request');
    this.mainPageService.getPage()
      .then((result) => {
        console.log(`it's result: ${JSON.stringify(result)}`);
      })
      .catch((err) => {
        console.log('haha, it\'s error here');
      });
  }

  public render() {
    return (
      <div className="index-page">
        <div className="title">hi there, it's react</div>
        <button className="btn-request" onClick={this.clickToRequest.bind(this)}>Click to Request</button>
      </div>
    );
  }
}