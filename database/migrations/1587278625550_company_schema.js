/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CompanySchema extends Schema {
  up() {
    this.create('companies', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.string('logo').notNullable();
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('company_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .integer('owner_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo');
      table.timestamps();
    });
  }

  down() {
    this.drop('companies');
  }
}

module.exports = CompanySchema;
