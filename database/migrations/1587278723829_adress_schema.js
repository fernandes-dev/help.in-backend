/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments();
      table.string('street').notNullable();
      table.string('district').notNullable();
      table.string('city').notNullable();
      table.string('state').notNullable();
      table.string('complement');
      table.string('cep');
      table
        .enu('type', ['Comercial', 'Residencial', 'Outro'])
        .defaultTo('Comercial');
      table
        .integer('user_id')
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
    this.drop('addresses');
  }
}

module.exports = AddressSchema;
