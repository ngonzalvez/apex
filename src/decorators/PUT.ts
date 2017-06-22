import {registerEndpoint} from '../utils';


export function PUT(url: string) : Function {
  return registerEndpoint.bind(null, 'put', url);
}
