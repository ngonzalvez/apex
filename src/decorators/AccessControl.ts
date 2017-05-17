import {Router} from 'express';


export default function AccessControl(...roles: Array<string>) : Function {
  return (endpoint, methodName) {
    endpoint[methodName] = function(req, res, next) {
      if (Array.prototype.includes.call(roles, req.user.role)) {
        return endpoint[methodName](req, res, next);
      }

      next();
    };
  }
}
