module.exports = {
  //
  // getUsers: (req, res) => {
  //   const db = req.app.get('db');
  //   db.users.find({})
  //     .then(results => {
  //       res.json(results);
  //     })
  //     .catch(err => {
  //       res.json(err);
  //     })
  // },
  // deleteUser: (req, res) => {
  //   const db = req.app.get('db');
  //
  //   db.delete_user(req.params.id)
  //     .then(results => {
  //       res.json(results);
  //     })
  //     .catch(err => {
  //       res.json(err);
  //     })
  // }

  getUsers(req, res) {
    req.app
      .get('db')
      .run('select * from users;')
      .then(users => res.json(users));
  },
  addUser(req, res) {
    req.app
      .get('db')
      .add_user(req.body)
      .then(users => res.json(users))
      .catch(err => res.json(err));
  },
  deleteUser(req, res) {
    req.app
      .get('db')
      .delete_user(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.json(err));
  },
  getUserInfo(req, res) {
    req.app
      .get('db')
      .get_user_info(req.params.id)
      .then(users => res.json(users))
      .catch(err => res.json(err));
  }

}
