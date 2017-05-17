import {Request, Response} from 'express';


interface Middleware {
  (req: Request, res: Response, next: Function) : void
}
