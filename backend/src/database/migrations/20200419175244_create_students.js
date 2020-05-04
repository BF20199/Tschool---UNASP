exports.up = function(knex) {
    return knex.schema.createTable('students', function(table){
        table.increments('id').primary();
        table.string('name_student').notNullable();
        table.integer('idade').notNullable();
        table.integer('id_res').notNullable();
        table.integer('id_class').notNullable();

        table.foreign('id_res').references('id_res').inTable('responsibles');
        table.foreign('id_class').references('id_class').inTable('class');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('students');
};
