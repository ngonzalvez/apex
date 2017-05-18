import {Router} from 'express';


export function DELETE(url: string) : Function {
  return (endpoint : any, methodName : string) => {
    const fn : Function = endpoint[methodName].bind(endpoint);

    endpoint.routes = endpoint.routes || Router();
    endpoint.routes.delete(url, fn);

    // TODO: Figure out if we really need this line.
    return fn;
  }
}
