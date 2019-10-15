import WebApiServer from 'art-lib-common/dist/core-server/WebApiServer';
import { IMainService, AjaxResult, IMainTest } from './interfaces/IMainService';

export default class MainService extends WebApiServer implements IMainService {
  constructor() {
    super({
      baseURL: 'http://me.dev.com:8000'
    });
  }

  private mainTestDto(result: string) {
    return JSON.parse(result);
  }

  public mainTest(): Promise<AjaxResult<IMainTest>> {
    return this.requestGet('mock_api/main/testme', {
      transformResponse: this.mainTestDto
    });
  }
}