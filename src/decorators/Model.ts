export function Model(Database : any) : Function {
  return (cls : Function) : void => {
    Database.orm.model(cls.name, cls);
  }
}

