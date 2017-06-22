import {registerEndpoint} from '../utils';


export function PATCH(url: string) : Function {
  return registerEndpoint.bind(null, 'patch', url);
}
