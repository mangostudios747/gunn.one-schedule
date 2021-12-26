const express = require('express');
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('./passport');
const uuid = require('node-uuid')
const MONGO_URL = process.env.MONGO_URL;
const {mdb} = require("./database");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const usersRouter = require('./routes/users');

let usersmdb, statsmdb, testmdb;
mdb.then(c=> {
  usersmdb = c.db('users').collection('profiles');
  statsmdb = c.db('stats').collection('userCount');
  testmdb = c.db('users').collection('test')
})
const store = MongoStore.create({
  mongoUrl: MONGO_URL,
});
const cookieParser = require('cookie-parser');
app.use(cookieParser());

app.use(session({
  secret: process.env.COOKIE_SECRET, // TODO: legit secret
  resave: false,
  store,
  genid: function () {
    return uuid.v4();
  },
  saveUninitialized: false,
  cookie: { //
    secure: false,
    maxAge: 365*24*60*60*1000
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const [pinitialize, psession] = [passport.initialize(), passport.session()]

app.use(pinitialize);
app.use(psession);

app.use('/users', usersRouter)

app.get('/', function(req, res){
  res.send('lol hi you found the api ig')
})

app.get('/test/add', async function (req, res){
  await testmdb.updateOne({_id:'testing'}, {$inc:{'counter':1}}, {upsert: true});
  res.send('yay we did it')
})

app.get('/test/get', async function (req, res){
  const n = await testmdb.findOne({_id:'testing'});
  res.send(`Counter = ${n.counter}`)
})


app.post('/auth/set-credentials', function(req, res){
  // hash the password using md5.
  console.log('hello???')
  try {
    res.cookie('credentials', crypto.createHash('md5').update(req.body.credential).digest('hex'));
  }
  catch (e) {
    res.send(e).end();
  }
  res.status(202).send();
})
app.get('/auth/register', function(req, res, next){
  console.log('it was called');
  next();
}, passport.authenticate('schoology'))

app.get('/auth/thanks-sgy', passport.authenticate('schoology'), async function (req, res) {
  await usersmdb.updateOne({_id: req.user.uid}, {$set: {passwordHash: req.cookies.credentials}});
  const token =  jwt.sign({ uid:req.user.profile.uid }, process.env.JWT_SECRET);
  res.redirect(`/register?${(new URLSearchParams({jwt:token})).toString()}`);
});


app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

module.exports = app
