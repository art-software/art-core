export class ServerConfig {
  private static serverConfig: any;

  public static get() {
    return ServerConfig.serverConfig;
  }

  public static set(serverConfig: any) {
    return ServerConfig.serverConfig = serverConfig;
  }
}