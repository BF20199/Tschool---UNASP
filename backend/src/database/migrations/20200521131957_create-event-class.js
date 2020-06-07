exports.up = function(knex) {
    return knex.schema.createTable('event-class', function(table){
        table.increments('id').primary();
        table.integer('id_event');
        table.integer('id_class');

        table.foreign('id_event').references('id_event').inTable('events');
        table.foreign('id_class').references('id_class').inTable('class');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('event-class');
};
