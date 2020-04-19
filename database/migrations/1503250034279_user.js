/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('name').notNullable();
      table.enu('type', ['Física', 'Jurídica']).defaultTo('Física');
      table.string('company_name');
      table.string('document').unique();
      table.enu('class', ['Usuario', 'Empresa']).defaultTo('Usuario');
      table.string('email').notNullable().unique();
      table.string('password').notNullable();
      table.string('phone').unique().notNullable();
      table.date('birthday').notNullable();
      table.enu('status', ['Ativo', 'Inativo']).defaultTo('Ativo');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
