import * as Knex from 'knex';
import * as Bookshelf from 'bookshelf';


const BOOKSHELF_PLUGINS = [
  require('bookshelf-modelbase').pluggable,
  require('bookshelf-cascade-delete'),
  'registry',
  'pagination',
  'visibility'
];

export class MigrationsManager {
  private knex : Knex;
  private config : any;

  constructor(knex : Knex, config : any) {
    this.knex = knex;
    this.config = config;
  }

  public latest() : void {
    this.knex.migrate.latest(this.config);
  }

  public rollback() : void {
    this.knex.migrate.rollback(this.config);
  }
}


export class Database {
  public static knex : Knex;
  public static orm : Bookshelf;
  public static Model : typeof Bookshelf.Model;
  public static migrations : MigrationsManager;

  public static init(config : any) : void {
    Database.knex = Knex(config);
    Database.orm = Bookshelf(Database.knex);

    BOOKSHELF_PLUGINS.forEach(plugin => {
      Database.orm.plugin(plugin);
    });

    if (config.bookshelf && config.bookshelf.plugins) {
      config.bookshelf.plugins.forEach((plugin : string) => {
        Database.orm.plugin(plugin);
      });
    }

    Database.Model = Database.orm.Model;
    Database.migrations = new MigrationsManager(Database.knex, config.migrations);
  }

  public static transaction(fn : any) : any {
    return Database.orm.transaction(fn);
  }

}
