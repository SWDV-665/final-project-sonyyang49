// Set up
var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

// Configuration
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/hmongames',
  { useNewUrlParser: true }
);

app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, PUT');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Models
var Users = mongoose.model('Users', {
  username: String,
  password: String,
  email: String,
  points: Number
});

// Get all users
app.get('/api/users', function(req, res) {
  console.log('Listing Users...');

  //use mongoose to get all groceries in the database
  Users.find(function(err, users) {
    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err) {
      res.send(err);
    }

    res.json(users); // return all groceries in JSON format
  });
});

// Create a new user
app.post('/api/users', function(req, res) {
  console.log('Creating new user...');

  Users.create(
    {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      points: 0,
      done: false
    },
    function(err, users) {
      if (err) {
        res.send(err);
      }

      // create and return all the groceries
      Users.find(function(err, users) {
        if (err) res.send(err);
        res.json(users);
      });
    }
  );
});

// Update a user
app.put('/api/users/:id', function(req, res) {
  const user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    points: req.body.points
  };
  console.log('Updating user - ', req.params.id);
  Users.update({ _id: req.params.id }, user, function(err, raw) {
    if (err) {
      res.send(err);
    }
    res.send(raw);
  });
});

// Delete a user
app.delete('/api/users/:id', function(req, res) {
  Users.remove(
    {
      _id: req.params.id
    },
    function(err, user) {
      if (err) {
        console.error('Error deleting user ', err);
      } else {
        Users.find(function(err, users) {
          if (err) {
            res.send(err);
          } else {
            res.json(users);
          }
        });
      }
    }
  );
});

// Start app and listen on port 8080
app.listen(process.env.PORT || 8080);
console.log('Grocery server listening on port  - ', process.env.PORT || 8080);
