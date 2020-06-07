exports.up = function(knex) {
    return knex.schema.createTable('class', function(table){
        table.increments('id_class').primary();
        table.string('nameclass').notNullable();
        //table.integer('num_students').notNullable();
        table.string('period').notNullable();
        table.integer('id_school').notNullable();

        table.foreign('id_school').references('id').inTable('schools');   
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('class');
  
};
