/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VoluntaryWorkRequirementsSchema extends Schema {
  up() {
    this.create('voluntary_work_requirements', (table) => {
      table.increments();
      table.string('name').notNullable();
      table
        .integer('voluntary_work_id')
        .unsigned()
        .references('id')
        .inTable('voluntary_works')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('voluntary_work_requirements');
  }
}

module.exports = VoluntaryWorkRequirementsSchema;
