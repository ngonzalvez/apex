export default function Model(db) {
  return cls => {
    // Register the model class in the Bookshelf model registry.
    (<any> db).model(cls.name, cls);

    // TODO: Figure out if this line is really necessary.
    return cls;
  }
}

