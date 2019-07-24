const db = require('../database/dbConfig');

module.exports = {
  getAllUsers,
  findBy,
  findById,
  addUser,
  updateUser,
  removeUser
};

function getAllUsers() {
  return db('users')
    .select('id', 'username', 'department');
}

function findBy(filter) {
  return db('users')
    .where(filter);
}

function findById(id) {
  return db('users')
    .where({ id })
    .first()
    .select('id', 'username', 'department');
}

async function addUser(user) {
  const [ id ] = await db('users').insert(user);
  return findById(id)
    .select('id', 'username', 'department');
}

function updateUser(id, changes) {
  return db('users')
    .where({ id })
    .update(changes);
}

function removeUser(id) {
  return db('users')
    .where({ id })
    .del();
}
