import React from 'react';
import IIndexService from '../services/IndexService';
import CoreComponent from 'art-lib-react/src/core/CoreComponent';

export default class ViewIndex extends CoreComponent<any, any> {

  constructor(props, context) {
    super(props, context);
    this.indexService = new IIndexService();
  }

  public indexService: IIndexService;

  public clickToRequest() {
    console.log('click to request');
    this.indexService.getData()
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
        <div className="title">Hi there, it's react</div>
        <button className="btn-request" onClick={this.clickToRequest.bind(this)}>Click to Request</button>
      </div>
    );
  }
}