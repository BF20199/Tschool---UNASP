
exports.up = function(knex) {
    return knex.schema.createTable('schools', function(table){
        table.increments('id').primary();
        table.string('nameschool').notNullable();
        table.integer('num_students').notNullable();
        table.string('zip_code').notNullable();
        table.string('email').notNullable();
        table.string('phone').notNullable();
        table.string('password').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('schools');
};
