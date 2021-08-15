'use strict';

import passport from 'koa-passport';
import AccountModel from '../models/account';

passport.serializeUser(function(user, done) {
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    AccountModel.findOne(id, function(err, user) {
        done(err, user)
    })
})

var LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(function(username, password, done) {
  
  AccountModel.verify(username, password)
    .then(function(result) {
        if(result != null) {
            done(null, result)
        }  else {
            done(null, false)
        }
    })
}))
