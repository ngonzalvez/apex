import {Router} from 'express';


export interface IEndpoint extends Function {
  url : string;
  routes : Router;
}
