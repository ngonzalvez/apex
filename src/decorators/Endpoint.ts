import * as express from 'express';
import {IEndpoint} from '../base/IEndpoint';


export function Endpoint(url : string) {
  return (cls : IEndpoint) => {
    cls.url = url;

    // TODO: Figure out if this line is really necessary.
    return cls;
  }
}

