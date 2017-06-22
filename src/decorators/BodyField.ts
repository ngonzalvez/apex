export function BodyField(
  name : string,
  type : any,
  description : string,
  fieldData : any
) : Function {
  return (cls : any, key : string) : void => {
    const fn : any = cls[key];

    fn.validations =  fn.validations || {};
    fn.validations.body = fn.validations.body || {};

    const field = fn.validations.body[name] = fieldData || {};
    field.type = type;
    field.description = description;
    field.isArray = type.endsWith('[]');
  };
}
