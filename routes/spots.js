var express = require('express');
var router = express.Router();
var Spot = require('../models/Spot')
var User = require('../models/User')
var passport = require('passport');
var CronJob = require('cron').CronJob;

// libera as vagas emprestadas toda meia noite
var job = new CronJob('00 00 00 * * *', function() {
    Spot.find({
        user: {$ne: null},
        released: true
    }, function(err, spots){
        spots.forEach(spot => {
            spot.released = false;
            spot.save()
        });
    });
}, true, 'America/Sao_Paulo');

router.post('/spots/new', function(req, res, next) {
    if (!req.user || req.user.role < 1) {
        res.redirect('/users/login');
    } else {

        Spot.create({
            new: true
        }, {
            number: req.body.number,
            floor: req.body.floor
        }, function(err, spot) {
            res.redirect('/');
        });
    }
});

router.post('/spots/assign', function(req, res, next) {
    if (!req.user || req.user.role < 1) {
        res.redirect('/users/login');
    } else {
        console.log(req.body);
        Spot.findOne({
            number: req.body.number
        }, function(err, spot) {
            if (spot) {
                User.findOne({
                    username: req.body.username
                }, function(err, user) {
                    spot.user = user;
                    spot.save();
                    console.log(spot);
                    res.redirect('/admin');
                });
            } else {
                res.redirect('/admin');
            }
        });
    }
});

module.exports = router;
