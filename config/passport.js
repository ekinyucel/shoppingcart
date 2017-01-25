var passport = require('passport');
var User = require('../models/user'); // import our user model from models folder.
var LocalStrategy = require('passport-local').Strategy; // there are tons of other strategies in the doc of passport.js

passport.serializeUser(function(user, done){
    //user.id saved in the session later we use this id to deserializeUser
    //it determines which data of the user should be stored in the session
    done(null, user.id);
});

passport.deserializeUser(function(id ,done){
    //whole object is retrieved with help of that key. that key is the user id.
    User.findById(id, function(err, user){
        done(err, user);
    });
});

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
},function(req, email, password, done){
    console.log("request: " , req);
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Password is too short').notEmpty().isLength({ min:4 });
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user){
        if(err) return done(err);
        if(user){
            return done(null, false, {message: 'Email is already in use'});
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result){
            if(err) return done(err);
            return done(null, newUser);
        });
    });
}));

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done){
    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.checkBody('password', 'Invalid password').notEmpty();
    var errors = req.validationErrors();
    if(errors){
        var messages = [];
        errors.forEach(function(error){
            messages.push(error.msg);
        });
        return done(null, false, req.flash('error', messages));
    }
    User.findOne({'email': email}, function(err, user){
        if(err) return done(err);
        if(!user) return done(null, false, {message: 'User not found'});
        if(!user.validPassword(password)) return done(null, false, {message: 'Wrong password'});

        return done(null, user);
    });
}));