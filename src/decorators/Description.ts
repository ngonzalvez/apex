export function Description(description: string) : Function {
  return (fn : any, key : string) : void => {
    fn[key].description = description;
  }
}
