import React from 'react';
import IndexService from '../services/IndexService';
import CoreComponentAll from 'art-lib-react/src/core_all/CoreComponentAll';
import { getQueryString } from 'art-lib-utils/dist/utils/url';

export default class ViewIndex extends CoreComponentAll<any, any> {

  constructor(props, context) {
    super(props, context);
    this.indexService = new IndexService();
  }

  public componentDidMount() {
    console.log('env: ', getQueryString('env'));
  }

  public indexService: IndexService;

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