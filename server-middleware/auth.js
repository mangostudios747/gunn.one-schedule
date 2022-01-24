const express = require('express');
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('./passport');
//const {v4: uuidv4} = require('uuid')
const MONGO_URL = process.env.MONGO_URL;
console.log('MONGO_URL is ' + MONGO_URL)
const {mdb} = require("./database");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const usersRouter = require('./routes/users');
const HOSTING_DOMAIN = process.env.RHOST || 'http://localhost:3000';

let usersmdb, statsmdb, testmdb, passwordsmdb;
mdb.then(c=> {
  usersmdb = c.db('users').collection('profiles');
  passwordsmdb = c.db('users').collection('passwords');
  statsmdb = c.db('stats').collection('userCount');
  testmdb = c.db('users').collection('test')
})

const hash = (pw)=>crypto.createHash('md5').update(pw).digest('hex');

const store = MongoStore.create({
  mongoUrl: MONGO_URL,
});
const cookieParser = require('cookie-parser');
console.log(process.env.COOKIE_SECRET, process.env.CONTAINER)
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store,
  genid: function () {
    return crypto.randomUUID();
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
    res.cookie('credentials', hash(req.body.credential));
  }
  catch (e) {
    res.send(e).end();
  }
  res.status(202).send();
})
app.get('/auth/register', passport.authenticate('schoology'))

app.get('/auth/guest-token', function (req, res) {
  const uid = crypto.randomUUID();
  res.json(jwt.sign({uid, guest:true}, process.env.JWT_SECRET))
})

/*app.post('/auth/register/basic', function (req, res) {
  const {name, email, password} = req.body
  // 1. Generate a UID
  const uid = crypto.randomUUID();
  const passwordEntry = {
    _id: uid,
    email,
    passwordHash: hash(password)
  };
  const profileEntry = {
    _id: uid,
    uid,
    primary_email: email,
    name_display: name,
    basicPlan: true,
  }
  // if user already exists, this API request ONLY changes the PASSWORD.
  usersmdb.updateOne({primary_email: email}, {$setOnInsert:profileEntry}, {upsert: true});
  // the only real identification we have rn is the email address.
  passwordsmdb.updateOne({email}, {$setOnInsert:{_id: uid, email}, $set:{passwordHash: passwordEntry.passwordHash}}, {upsert: true});

  // the user's uid is not necessarily the one we just generated
  const {uid: realUID} = passwordsmdb.findOne({email});

  res.json(jwt.sign({uid: realUID}, process.env.JWT_SECRET));
})*/

app.post('/auth/login', async function (req, res) {
  const {email, password} = req.body;
  // check the passwordsmdb for the email and the passwordhash
  const profile = await passwordsmdb.findOne({email});
  if (!profile) {
    return res.json({error: 'user-not-found'}).end();
  }
  const hash2 = hash(password);
  if (hash2!== profile.passwordHash) {
    return res.json({error:'incorrect-password'}).end();
  }
  // email exists, and the password is correct.
  // generate JWT

  // this will also exist in basic plans
  return res.json({
    jwt: jwt.sign({ uid:profile._id }, process.env.JWT_SECRET)
  })
});

app.get('/auth/thanks-sgy', passport.authenticate('schoology'), async function (req, res) {
  await passwordsmdb.updateOne({_id: req.user.profile.uid}, {$set: {passwordHash: req.cookies.credentials, email:req.user.profile.primary_email}}, {upsert: true});
  const token =  jwt.sign({ uid:req.user.profile.uid }, process.env.JWT_SECRET);
  res.redirect(`${HOSTING_DOMAIN}/register?${(new URLSearchParams({jwt:token})).toString()}`);
});


app.get('/users/me', passport.authenticate('jwt'), async function (req, res){
  res.json(req.user).end();
})

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

module.exports = app
