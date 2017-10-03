const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const massive = require('massive');
const port = 3000;
const app = express();
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

const ctrl = require('./server/ctrl.js');

app.get('/api/users', ctrl.getUsers);
app.post('/api/users/add/', ctrl.addUser);
app.delete('/api/users/:id', ctrl.deleteUser);

app.get('/api/user/:id', ctrl.getUserInfo);

app.listen(port, function() {
  console.log('Server listening on port', port);
})
