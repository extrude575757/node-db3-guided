// user-model
const db = require("../../data/db-config.js");

module.exports = {
  getPosts(id) {
    // select
    //     p.id, contents, username
    // from posts p
    // join users u
    //     on p.user_id = u.id
    // where u.id = 1;
    return db('posts as p')
      .join('users as u', 'p.user_id', 'u.id')
      .select('p.id', 'contents', 'username')
      .where('p.user_id', id)
  }
}
