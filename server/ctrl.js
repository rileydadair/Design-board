module.exports = {

  checkUser: (req, res) => {
    const username = req.body.username;
    const db = req.app.get('db');
    db.get_users().then((users) => {
      const person = users.find(cur => cur.username == username);
      if(!person) {
        res.send({ validUser: 'create new user'});
      }
      res.send({ validUser: 'username already exists' });
    })
  },

  createUser(req, res) {
    req.app
      .get('db')
      .add_user(req.body)
      .then(users => res.json(users))
      .catch(err => res.json(err));
  },

  login: (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const db = req.app.get('db');
    db.get_users().then((users) => {
      const person = users.find(cur => cur.username == username);
      if(!person) {
        res.send({ validUser: 'no user'});
      }
      if (person.password != password) {
        res.send({ validUser: 'incorrect password' });
      }
      req.session.user = person;
      res.send({ validUser: 'valid', user: req.session.user })
    })
  },

  checkBoard: (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const db = req.app.get('db');
    db.get_boards([id]).then((boards) => {
      const board = boards.find(cur => cur.name == name);
      if(!board) {
        res.send({validBoard: 'create new board'});
      }
      res.send({validBoard: 'board already exists'});
    })
  },

  createBoard: (req, res) => {
    const name = req.body.name;
    const id = req.body.id;
    const db = req.app.get('db');
    db.add_board([ name, id ])
    .then(board => res.send(board))
    .catch(err => res.json(err));
  },

  getBoards(req, res) {
    req.app
      .get('db')
      .get_boards(req.params.id)
      .then(boards => res.json(boards))
      .catch(err => res.json(err));
  },

  addImage(req, res) {
    req.app
      .get('db')
      .add_image(req.body)
      .then(image => res.json(image))
      .catch(err => res.json(err));
  },

  getBoardImages(req, res) {
    req.app
      .get('db')
      .get_board_images(req.params.id)
      .then(images => res.json(images))
      .catch(err => res.json(err));
  }

  // getUserInfo(req, res) {
  //   req.app
  //     .get('db')
  //     .get_user_info(req.params.id)
  //     .then(users => res.json(users))
  //     .catch(err => res.json(err));
  // }
}
