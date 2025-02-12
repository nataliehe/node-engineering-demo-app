var User = require('../models/user');
var bcrypt = require('bcrypt');
var saltRounds = 10;
var error_message;

var UsersController = {
  New: function(req, res) {
    res.render('users/sign_up');
  },
  Create: function(req, res) {
    var password = req.body.password;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) { console.log('Encryption error: ' + err ); }
      var user = new User({ name: req.body.name, email: req.body.email, password: hash });
      user.save(function(err) {
        if (err) { throw err; }
        res.status(201).redirect('/');
      });
    });
  },
  Login: function(req, res) {
    res.render('users/log_in', {logged_in: false, error_message: error_message});
    error_message = '';
  },
  Authenticate: function(req, res) {
    var logInEmail = req.body.email;
    var logInPassword = req.body.password;
    User.find({email: logInEmail}, function(err, user) {
      if (err) { throw err; }
      if (user == undefined || user.length == 0) {
        error_message = 'Incorrect email address, please try again.';
        res.status(201).redirect('/');
      } else {
        var hash = user[0].password;
        bcrypt.compare(logInPassword, hash, function(err, matched) {
          if (err) { throw err; }
          if (matched !=  true) {
            error_message = 'Incorrect password, please try again.';
            res.status(201).redirect('/');
          } else {
            res.cookie('user', user[0].name);
            res.status(201).redirect('/posts');
          }
        });
      }
    });
  },
  Logout: function(req, res) {
    res.status(201).redirect('/');
  }
};

module.exports = UsersController;
