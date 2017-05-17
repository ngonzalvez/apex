import {Router} from 'express';


export default function DELETE(url: string) : Function {
  return (endpoint, methodName) {
    const fn = endpoint[methodName].bind(endpoint);

    endpoint.routes.delete(url, fn);

    // TODO: Figure out if we really need this line.
    return fn;
  }
}
