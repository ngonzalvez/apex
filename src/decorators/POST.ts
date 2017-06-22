import {registerEndpoint} from '../utils';


export function POST(url: string) : Function {
  return registerEndpoint.bind(null, 'post', url);
}
