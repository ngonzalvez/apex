import * as express from 'express';


export default function Endpoint(url) {
  return cls => {
    cls.routes = express.Router();

    // TODO: Figure out if this line is really necessary.
    return cls;
  }
}

