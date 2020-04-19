/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class VoluntaryWorkImgsSchema extends Schema {
  up() {
    this.create('voluntary_work_imgs', (table) => {
      table.increments();
      table
        .string('url')
        .defaultTo(
          'http://vedassistemas.com.br/img/help-in-images/default.png'
        );
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
    this.drop('voluntary_work_imgs');
  }
}

module.exports = VoluntaryWorkImgsSchema;
