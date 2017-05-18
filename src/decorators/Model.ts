export function Model(db : any) {
  return (cls : Function) => {
    // Register the model class in the Bookshelf model registry.
    db.model(cls.name, cls);

    // TODO: Figure out if this line is really necessary.
    return cls;
  }
}

