exports.up = function(knex, Promise) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments('id');
        tbl.string('vin').unique().notNullable();
        tbl.string('make').notNullable();
        tbl.string('model').notNullable();
        tbl.integer('mileage').notNullable();
        tbl.string('transmission_type');
        tbl.string('title_status');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('cars');
}