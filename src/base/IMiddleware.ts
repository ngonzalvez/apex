import {Request, Response} from 'express';


export interface IMiddleware {
  (req: Request, res: Response, next: Function) : void
}
