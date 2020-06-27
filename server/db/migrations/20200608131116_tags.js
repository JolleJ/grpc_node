
exports.up = function(knex, Promise) {
    return knex.schema.createTable('tags', function (table) {
        table.increments();
        table.string('tagId').notNullable();
        table.string('pin').notNullable();
        table.string('name').notNullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('tags');  
};
