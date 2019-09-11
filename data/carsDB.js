const db = require ('./dbConfig')

function get(id){
    if (id == undefined) {
        return db('cars');
    } else {
        return db('cars')
        .where({ id })
        .first();
    }
}

function insert(car) {
    return db('cars')
    .insert(car)
    .then(ids => {
      return get(ids[0]);
    });
}

function getByVin(vin) {
    return db('cars')
    .where({vin})
    .first();
}

function remove(id) {
    return db('cars')
    .where({id})
    .del();
}

function update(id, changes) {
    return db('cars')
    .where({ id })
    .update(changes);
}

module.exports = {get, insert, getByVin, remove, update}