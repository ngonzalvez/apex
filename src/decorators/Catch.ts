import {Router, Response} from 'express';


export function Catch(error: string) : Function {
  return (endpoint : any, methodName : string) : void => {
    const fn = endpoint[methodName].bind(endpoint);

    endpoint[methodName] = function(req : any, res : Response, next : Function) {
      // Add catch.
      fn(req, res, next).catch((err: any) => {
        console.log(err);
        res.status(500).send({ error });
      })
    }
  }
}
