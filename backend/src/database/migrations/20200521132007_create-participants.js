exports.up = function(knex) {
    return knex.schema.createTable('participants', function(table){
        table.increments('id').primary();
        table.integer('id_event');
        table.integer('id_student');
        table.integer('authorization');//0 or 1

        table.foreign('id_event').references('id_event').inTable('events');
        table.foreign('id_student').references('id').inTable('students');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('participants');
};
