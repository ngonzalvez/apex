export function RequiredScope(scope : string) : Function {
  return (fn : any, key : string) : void => {
    fn[key].requiredScope = scope;
  }
}
