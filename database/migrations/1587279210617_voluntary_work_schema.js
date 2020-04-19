/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VoluntaryWorkSchema extends Schema {
  up() {
    this.create('voluntary_works', (table) => {
      table.increments();
      table.string('title').notNullable();
      table.string('description').notNullable();
      table.string('activities').notNullable();
      table
        .integer('company_id')
        .unsigned()
        .references('id')
        .inTable('companies')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('voluntary_works');
  }
}

module.exports = VoluntaryWorkSchema;
