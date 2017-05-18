import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';


const DEFAULT_PLUGINS = [
  require('bookshelf-modelbase').pluggable,
  require('bookshelf-cascade-delete'),
  'registry',
  'pagination'
];


export class Database {
  public static knex : Knex;
  public static orm : Bookshelf;
  public static Model : typeof Bookshelf.Model;

  public static init(config : any) : void {
    Database.knex = Knex(config);
    Database.orm = Bookshelf(Database.knex);

    DEFAULT_PLUGINS.forEach(plugin => {
      Database.orm.plugin(plugin);
    });

    if (config.bookshelf && config.bookshelf.plugins) {
      config.bookshelf.plugins.forEach((plugin : string) => {
        Database.orm.plugin(plugin);
      });
    }

    Database.Model = Database.orm.Model;
  }
}
