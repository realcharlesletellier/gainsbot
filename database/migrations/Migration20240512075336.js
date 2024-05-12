'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20240512075336 extends Migration {

  async up() {
    this.addSql('alter table `user` add column `weight` integer not null default 0;');
  }

}
exports.Migration20240512075336 = Migration20240512075336;
