const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
// Session - const session = require('express-session');
const massive = require('massive');
const port = 3000;
const app = express();
const ctrl = require('./server/ctrl.js');
// Session - const { secret, dbUser, database } = require('./server/config');
const { dbUser, database } = require('./server/config');
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


// Session -
// app.use(session({
//   secret,
//   resave: true,
//   saveUninitialized: true
// }))
// if not logged in, send error message and catch in resolve
// else send user
// app.get('/auth/me', (req, res) => {
//     if (!req.session.user) return res.status(401).json({err: 'User Not Authenticated'});
//     res.status(200).json(req.session.user);
// });

/*
Endpoints ======================================================================
*/
// Home Endpoints
app.post('/user/login', ctrl.login);
app.get('/user/getUserId/:id', ctrl.getUserId);
app.post('/user/checkUser', ctrl.checkUser);
app.post('/user/createUser', ctrl.createUser);
// Directory Endpoints
app.get('/user/getUser/:id', ctrl.getUser);
app.get('/user/getBoards/:id', ctrl.getBoards);
app.get('/user/getDirectoryImages/:id', ctrl.getDirectoryImages);
app.post('/user/checkBoard', ctrl.checkBoard);
app.post('/user/createBoard', ctrl.createBoard);
app.post('/user/deleteBoard', ctrl.deleteBoard);
// Board Endpoints
app.post('/api/user/getBoardName', ctrl.getBoardName);
app.post('/api/user/addImage', ctrl.addImage);
app.post('/api/user/addsite', ctrl.addSite);
app.post('/api/user/deleteImage', ctrl.deleteImage);
app.post('/api/user/deleteSite', ctrl.deleteSite);
app.get('/api/user/getBoardImages/:id', ctrl.getBoardImages);
app.post('/api/user/getBoardSites', ctrl.getBoardSites);


app.listen(port, function() {
  console.log('Server listening on port', port);
})
