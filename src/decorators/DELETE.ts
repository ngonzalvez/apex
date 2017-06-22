import {registerEndpoint} from '../utils';


export function DELETE(url: string) : Function {
  return registerEndpoint.bind(null, 'delete', url);
}
