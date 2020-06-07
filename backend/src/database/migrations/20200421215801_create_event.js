exports.up = function(knex) {
    return knex.schema.createTable('events', function(table){
        table.increments('id_event').primary();
        table.string('title').notNullable();
        table.string('endereco').notNullable();
        table.string('date').notNullable();
        table.string('hr_ini').notNullable();
        table.string('hr_fin').notNullable();
        table.string('description').notNullable();
        table.string('observation').notNullable();
        table.string('value').notNullable();
        table.integer('id_school').notNullable();

        table.foreign('id_school').references('id').inTable('schools');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('events');
  
};
