import { aggregator } from '../BaseRenderWebApi';

export class HomeService {
  public requestRenderHome() {
    // return baseRenderWebApi.requestPost('/batch', {
    //   data: {
    //     Home: {
    //       name: 'Home',
    //       data: {}
    //     }
    //   }
    // }).then((result) => {
    //   if (!result) { return {}; }
    //   return result.data && result.data.results.Home;
    // });
    const jobs = {
      Home: {
        name: 'Home',
        data: {}
      }
    };
    return aggregator.render(jobs).then((result) => {
      console.log('result: ', result);
      // return result.data && result.data.results.Home;
      return result;
    });
  }

  public requestRenderAbout() {
    // return baseRenderWebApi.requestPost('/batch', {
    //   data: {
    //     About: {
    //       name: 'About',
    //       data: {}
    //     }
    //   }
    // }).then((result) => {
    //   if (!result) { return {}; }
    //   return result.data && result.data.results.About;
    // });

    const jobs = {
      About: {
        name: 'About',
        data: {}
      }
    };
    return aggregator.render(jobs).then((result) => {
      console.log('result: ', result);
      return result;
    });
  }
}