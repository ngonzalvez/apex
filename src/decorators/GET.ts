import {registerEndpoint} from '../utils';


export function GET(url: string) : Function {
  return registerEndpoint.bind(null, 'get', url);
}
