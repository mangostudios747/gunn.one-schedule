/* IMPORTS */
const passport = require('passport')
  , SchoologyStrategy = require('passport-schoology-oauth').SchoologyStrategy;

const {mdb} = require("../database");
let usersmdb, authmdb;
mdb.then(c=> {
  usersmdb = c.db('users').collection('profiles');
  authmdb = c.db('users').collection('tokens');
})
const {getProfile} = require('../schoology')
const { key, secret } = { key: process.env.SCHOOLOGY_KEY, secret: process.env.SCHOOLOGY_SECRET }

/* CONSTANTS */
const HOSTING_DOMAIN = process.env.RHOST || 'http://localhost:3000';
const sgyDomain = 'https://pausd.schoology.com'


passport.use('schoology',new SchoologyStrategy({
    consumerKey: key,
    consumerSecret: secret,
    callbackURL: `${HOSTING_DOMAIN}/api/auth/thanks-sgy`,
    sgyDomain
  },
  async function(token, tokenSecret, profile, done) {
    //console.log(token, tokenSecret)
    // these are access tokens and access secrets!
    // we need to fetch the user profile now
    getProfile({token, tokenSecret}).then(function(userProfile) {
      //console.log(userProfile.name_display)
      userProfile._id = userProfile.id;
      usersmdb.updateOne({_id: userProfile.id }, { $set: userProfile }, {upsert: true})
      authmdb.updateOne({_id: userProfile.id }, { $set: {token, tokenSecret} }, {upsert: true})
      done(null, {profile:userProfile, credentials:{token, tokenSecret}})
    })

  }));

const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
opts.secretOrKey = process.env.JWT_SECRET;
passport.use('jwt', new JwtStrategy(opts, function(jwt_payload, done) {
  usersmdb.findOne({uid: jwt_payload.uid}).then((u)=>{
    authmdb.findOne({_id:+jwt_payload.uid}).then((c)=>{
      done(null, {credentials:c, profile:u});
    });
  });
}));

passport.serializeUser(function(user, done) {
  done(null, user.profile.uid);
});

passport.deserializeUser(function(uid, done) {
  usersmdb.findOne({uid:uid}).then((u)=>{
    authmdb.findOne({_id:+uid}).then((c)=>{
      done(null, {credentials:c, profile:u});
    });

  });
});


module.exports = passport
