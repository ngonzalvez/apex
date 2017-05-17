// Node modules.
import * as express from 'express';
import * as http from 'http';

// WhiteBear modules.
import Middleware from './Middleware';
import Endpoint from './Endpoint';


/**
 * HTTP Server configuration.
 */
interface HttpServerConfig {
  public middlewares : Array<IMiddleware>;
  public endpoints : Array<IEndpoint>;
  public environment : string;
  public version : string;
}


/**
 * Web API server.
 *
 * This class provides an abstraction for creating an HTTP server, registering
 * endpoints, middlewares, and handling the SSL configuration easily.
 */
export class HttpServer {
  public environment : string;
  public version : string;
  private express : express;

  /**
   * HttpServer constructor.
   *
   * @param {HttpServerConfig} config   Web API configuration.
   */
  constructor(config : HttpServerConfig) {
    this.express = express();
    this.environment = config.environment;
    this.version = config.version;

    for (let i = 0; i < config.middlewares.length; i++) {
      this.express.use(config.middlewares[i]);
    }

    for (let name in config.endpoints) {
      const endpoint = config.endpoints[name];
      this.express.use(`/${config.version}/${endpoint.url}`, endpoint.routes);
    }
  }

  /**
   * Start the server on the given port.
   *
   * @param {string} port   Port on which the server will be listening to.
   * @param {string} host   The host IP/name for the serve.
   */
  public async listen(port : string, host : string) : void {
    const server = http.createServer(this.express);
    await server.listen(port, host);
  }
}
