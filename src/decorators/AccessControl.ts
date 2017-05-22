import {Router, Response} from 'express';


export function AccessControl(role: string) : Function {
  return (endpoint : any, methodName : string) : void => {
    const fn = endpoint[methodName].bind(endpoint);

    endpoint[methodName] = function(req : any, res : Response, next : Function) {
      // Not authenticated.
      if (req.user === undefined) {
        console.log('Not  auth');
        res.status(401).send({ error: 'Authentication required' });
        return;
      }

      // Not authorized.
      else if (!req.user.scopes.includes(role)) {
        console.log('No scope');
        res.status(403).send({ error: 'Forbidden' });
        return;
      }

      // Access granted.
      fn(req, res, next);
    }
  }
}
