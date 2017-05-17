import {Router} from 'express';


export default function PUT(url: string) : Function {
  return (endpoint, methodName) {
    const fn = endpoint[methodName].bind(endpoint);

    endpoint.routes.put(url, fn);

    // TODO: Figure out if we really need this line.
    return fn;
  }
}
