// Node modules.
import * as express from 'express';
import * as http from 'http';
import * as boom from 'express-boom';

// WhiteBear modules.
import {IMiddleware} from './IMiddleware';
import {IEndpoint} from './IEndpoint';
import {Endpoint} from '../decorators/Endpoint';


const DEFAULT_PLUGINS = [
  boom()
];

const DEFAULT_MIDDLEWARES = [];

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

    this.registerPlugins(config.plugins);
    this.registerMiddlewares(config.middlewares);
    this.registerEndpoints(config.endpoints);
  }

  /**
   * Register the given plugins, if provided.
   *
   * @param {any} plugins   Array of express plugins.
   */
  public registerPlugins(plugins : any) : void {
    let i;

    for (i = 0; i < DEFAULT_PLUGINS.length; i++) {
      this.express.use(DEFAULT_PLUGIN[i]);
    }

    if (plugins) {
      for (i = 0; i < plugins.length; i++) {
        this.express.use(plugins[i]);
      }
    }
  }

  /**
   * Register the middlewares in the order they were provided, if provided.
   *
   * @param {any} middlewares   An array of middlewares.
   */
  public registerMiddlewares(middlewares : any) : void {
    let i;

    for (i = 0; i < DEFAULT_MIDDLEWARES.length; i++) {
      this.express.use(DEFAULT_MIDDLEWARES[i]);
    }

    if (middlewares) {
      for (i = 0; i < middlewares.length; i++) {
        this.express.use(middlewares[i]);
      }
    }
  }

  /**
   * Initialize the routing for the given endpoints.
   *
   * @param {Array<any>} endpoints  An array of endpoints.
   */
  public registerEndpoints(endpoints : Array<any>) : void {
    for (let name in endpoints) {
      const endpoint = endpoints[name];
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
