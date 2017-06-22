export function ErrorMessage(error: string) : Function {
  return (fn : any, key : string) : void => {
    (fn[key] as any).errorMessage = error;
  }
}
