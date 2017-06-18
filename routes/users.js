var express = require('express');
var router = express.Router();
var User = require('../models/User')
var Spot = require('../models/Spot')
var passport = require('passport');

/* GET users listing. */

router.get('/new', function(req, res, next) {
  res.render('new', { });
});

router.post('/new', function(req, res, next) {
    User.register(new User({ username : req.body.username, realname: req.body.realname }), req.body.password, function(err, user) {
        if (err) {
          return res.render('new', { error : err.message, new: true });
        }

        passport.authenticate('local')(req, res, function () {
            req.session.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

router.get('/login', function(req, res, next) {
    if(req.user){
        res.redirect('/');
    }
    else {
        res.render('login', {user: req.user});
    }

});

router.post('/login', passport.authenticate('local'), function(req, res, next){
    res.redirect('/');
});

router.get('/subscribe', function(req, res, next) {
    if(!req.user){
        res.redirect('/users/login');
    }
    else {
        User.findOneAndUpdate({
            username: req.user.username
        },{
            subscribed: true
        }, function(err, user){
            res.redirect('/');
        });
    }
});

router.get('/unsubscribe', function(req, res, next) {
    if(!req.user){
        res.redirect('/users/login');
    }
    else {
        User.findOneAndUpdate({
            username: req.user.username
        },{
            subscribed: false
        }, function(err, user){
            res.redirect('/');
        });
    }
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
