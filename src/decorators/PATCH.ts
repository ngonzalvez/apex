import {Router} from 'express';


export default function PATCH(url: string) : Function {
  return (endpoint, methodName) {
    const fn = endpoint[methodName].bind(endpoint);

    endpoint.routes.patch(url, fn);

    // TODO: Figure out if we really need this line.
    return fn;
  }
}
