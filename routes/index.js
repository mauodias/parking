var express = require('express');
var router = express.Router();
var Spot = require('../models/Spot')
var User = require('../models/User')

/* GET home page. */
router.get('/', function(req, res, next) {
    if(!req.user){
        res.redirect('/users/login');
    }
    else{
        Spot.find({}, function(err, spots){
            res.render('index', { title: 'Express', user: req.user, spots: spots });
        });
    }
});

router.get('/admin', function(req, res, next) {
    if(!req.user || req.user.role < 1){
        res.render('login', {});
    }
    User.find({}, function(err, users){
        if (err) return next(err);
        Spot.find({}, function(err, spots) {
            res.render('admin', {users: users, spots: spots});
        });
    });
});

module.exports = router;
