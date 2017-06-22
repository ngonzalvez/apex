export function QueryParam(
  name : string,
  type : any,
  description : string,
  fieldData : any
) : Function {
  return (cls : any, key : string) : void => {
    const fn : any = cls[key];

    fn.validations =  fn.validations || {};
    fn.validations.query = fn.validations.query || {};

    const field = fn.validations.query[name] = fieldData || {};
    field.type = type;
    field.description = description;
    field.isArray = type.endsWith('[]');
  };
}
