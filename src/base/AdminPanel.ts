import {IEndpoint} from '../base/IEndpoint';
import {Router} from 'express';


export class AdminPanel {
  private endpoints : Array<IEndpoint>;
  private version : string;
  public routes : Router;

  constructor(endpoints : Array<IEndpoint>, version : string) {
    this.endpoints = endpoints;
    this.version = version;
    this.routes = Router();

    this.createRoutes();
  }

  createRoutes() : void {
    // Admin panel index.
    this.routes.get('/', (req, res) => {
      res.render('index', {
        page: 'home',
        endpoints: this.endpoints,
        endpoint: null,
        action: null,
        version: this.version
      });
    });

    for (let endpoint of this.endpoints) {
      const actions = endpoint.routes.stack.map(item => {
        const handler = item.route.stack[0].handle;
        return {
          method: handler.httpVerb,
          description: handler.description,
          name: handler.actionName,
          requiredScope: handler.requiredScope,
          headers: handler.headers,
          queryParams: handler.queryParams,
          bodyFields: handler.bodyFields,
          url: '/' + endpoint.url + handler.url,
          action: null,
        };
      });

      // Actions listing.
      this.routes.get(`/${endpoint.url}`, (req, res) => {
        res.render('index', {
          page: 'actionListing',
          endpoints: this.endpoints,
          version: this.version,
          endpoint: endpoint,
          action: null,
          actions,
        });
      });

      // Action detail.
      for (let action of actions) {
        this.routes.get(`/${endpoint.url}/${action.name}`, (req, res) => {
          res.render('index', {
            page: 'actionDetail',
            endpoints: this.endpoints,
            version: this.version,
            endpoint: endpoint,
            actions: null,
            action,
          });
        });
      }
    }
  }
}
