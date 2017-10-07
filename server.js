const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const port = 3000;
const app = express();
const ctrl = require('./server/ctrl.js');
const { secret, dbUser, database } = require('./server/config');

// Database connection information
const connectionString = `postgres://${dbUser}@localhost/${database}`;

// connecting to our DB with massive
massive(connectionString).then(db => {
  app.set('db', db);
});

// required middlewares
app.use(json());
app.use(cors());
app.use('/', express.static(__dirname + '/public'));
app.use(session({
  secret,
  resave: true,
  saveUninitialized: true
}))
// if not logged in, send error message and catch in resolve
// else send user
app.get('/auth/me', (req, res) => {
    if (!req.session.user) return res.status(401).json({err: 'User Not Authenticated'});
    res.status(200).json(req.session.user);
});

// Endpoints
app.post('/api/user/checkUser', ctrl.checkUser);
app.post('/api/user/createUser', ctrl.createUser);
app.post('/api/user/login', ctrl.login);
app.post('/api/user/checkBoard', ctrl.checkBoard)
app.post('/api/user/createBoard', ctrl.createBoard);
app.get('/api/user/getBoards/:id', ctrl.getBoards);
app.get('/api/user/getBoardImages/:id', ctrl.getBoardImages);
app.post('/api/user/addImage', ctrl.addImage);

// app.get('/api/user/:id', ctrl.getUserInfo);

app.listen(port, function() {
  console.log('Server listening on port', port);
})
