// user-model
const db = require("../../data/db-config.js");

module.exports = {find};

  async function find(){
    return db('users');
  }



