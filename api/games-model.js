const db = require('../data/dbConfig')

module.exports = {
    add,
    get
}

function add(game) {
    return db('games')
        .insert(game)
        .then(ids => {
            const [id] = ids
            return findById(id)
        })
}

function get() {
    return db('games')
}

function findById(id) {
    return db('games')
        .where({ id })
        .first()
}