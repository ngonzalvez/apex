import {Router, Response} from 'express';


export function AccessControl(...roles: Array<string>) : Function {
  return (endpoint : any, methodName : string) => {
    endpoint[methodName] = function(req : any, res : Response, next : Function) {
      if (roles.includes(req.user.role)) {
        return endpoint[methodName](req, res, next);
      }

      next();
    }
  }
}
