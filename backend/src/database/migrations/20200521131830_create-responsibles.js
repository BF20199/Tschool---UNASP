exports.up = function(knex) {
    return knex.schema.createTable('responsibles', function(table){
        table.increments('id_res').primary();
        table.string('cpf').notNullable();
        table.string('name_res').notNullable();
        table.string('zip_code').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('responsibles');
  
};