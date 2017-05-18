// Node modules.
import * as express from 'express';
import * as http from 'http';

// WhiteBear modules.
import {IMiddleware} from './IMiddleware';
import {IEndpoint} from './IEndpoint';
import {Endpoint} from '../decorators/Endpoint';


/**
 * HTTP Server configuration.
 */
interface HttpServerConfig {
  middlewares : Array<IMiddleware>;
  endpoints : Array<IEndpoint>;
  environment : string;
  version : string;
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
  private express : any;

  /**
   * HttpServer constructor.
   *
   * @param {Object} config   Web API configuration.
   */
  constructor(config : any) {
    this.express = express();
    this.environment = config.environment;
    this.version = config.version;

    if (config.middlewares) {
      for (let i = 0; i < config.middlewares.length; i++) {
        this.express.use(config.middlewares[i]);
      }
    }

    for (let name in config.endpoints) {
      const endpoint = config.endpoints[name];
      console.log(`/${config.version}/${endpoint.url}`);
      this.express.use(`/${config.version}/${endpoint.url}`, endpoint.routes);
    }
  }

  /**
   * Start the server on the given port.
   *
   * @param {string} port   Port on which the server will be listening to.
   * @param {string} host   The host IP/name for the serve.
   */
  public async listen(port : number, host : string) : Promise<Object> {
    const server = http.createServer(this.express);

    return new Promise((resolve, reject) => {
      server
        .listen(port, host, resolve)
        .on('error', reject);
    });
  }
}
