const express = require('express');
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('./passport');
//const {v4: uuidv4} = require('uuid')
const MONGO_URL = process.env.MONGO_URL;
const {mdb} = require("./database");
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const usersRouter = require('./routes/users');
const HOSTING_DOMAIN = process.env.RHOST || 'http://localhost:3000';
const schoology = require('./schoology')

let usersmdb, statsmdb, testmdb, passwordsmdb, elimdb, prefmdb;
mdb.then(c=> {
  usersmdb = c.db('users').collection('profiles');
  passwordsmdb = c.db('users').collection('passwords');
  statsmdb = c.db('stats').collection('userCount');
  testmdb = c.db('users').collection('test')
  elimdb = c.db('users').collection('elimination');
  prefmdb = c.db('users').collection('preferences');
})

const hash = (pw) => crypto.createHash('md5').update(pw).digest('hex');

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
    maxAge: 365 * 24 * 60 * 60 * 1000
  }
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const [pinitialize, psession] = [passport.initialize(), passport.session()]

app.use(pinitialize);
app.use(psession);

app.use('/users', usersRouter)

app.get('/', function (req, res) {
  res.send({hi:'lol hi you found the api ig'})
})

app.get('/test/add', async function (req, res) {
  await testmdb.updateOne({_id: 'testing'}, {$inc: {'counter': 1}}, {upsert: true});
  res.send('yay we did it')
})

app.get('/test/get', async function (req, res) {
  const n = await testmdb.findOne({_id: 'testing'});
  res.send(`Counter = ${n.counter}`)
})


app.post('/auth/set-credentials', function (req, res) {
  // hash the password using md5.
  console.log('hello???')
  try {
    res.cookie('credentials', hash(req.body.credential));
  } catch (e) {
    res.send(e).end();
  }
  res.status(202).send();
})
app.get('/auth/register', passport.authenticate('schoology'))

app.get('/auth/guest-token', function (req, res) {
  const uid = crypto.randomUUID();
  res.json(jwt.sign({uid, guest: true}, process.env.JWT_SECRET))
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
  if (hash2 !== profile.passwordHash) {
    return res.json({error: 'incorrect-password'}).end();
  }
  // email exists, and the password is correct.
  // generate JWT

  // this will also exist in basic plans
  return res.json({
    jwt: jwt.sign({uid: profile._id}, process.env.JWT_SECRET)
  })
});

app.get('/auth/thanks-schoology', passport.authenticate('schoology'), async function (req, res) {
  await passwordsmdb.updateOne({_id: req.user.profile.uid}, {
    $set: {
      passwordHash: req.cookies.credentials,
      email: req.user.profile.primary_email
    }
  }, {upsert: true});
  const token = jwt.sign({uid: req.user.profile.uid}, process.env.JWT_SECRET);
  res.redirect(`${HOSTING_DOMAIN}/register?${(new URLSearchParams({jwt: token})).toString()}`);
});


const api = express.Router();

api.use(passport.authenticate('jwt'))

api.get('/users/me', async function (req, res) {
  res.json(req.user.profile).end();
})

api.get('/users/me/sections', async function (req, res) {
  const sections = await schoology.fetchSections(req.user);
  res.json(sections).end();
})

api.get('/sections/:section_id', async function(req, res){
  const section = await schoology.getSection(req.user, req.params.section_id);
  res.json(section).end()
})

api.get('/sections/:section_id/updates', async function (req, res) {
  const updates = await schoology.fetchCourseUpdates(req.user, req.params.section_id);
  res.json({updates}).end();
})

api.get('/sections/:section_id/grades', async function (req, res) {
  const grades = await schoology.fetchSectionGrades(req.user, req.params.section_id);
  res.json({grades}).end();
})

api.patch('/preferences/classes',  async function (req, res, next) {
  const classp = req.body;
  await prefmdb.updateOne({_id: req.user.profile._id}, {$set: {classes: classp}}, {upsert: true});
  res.status(204).end();
})

api.get('/preferences/classes', async function (req, res, next) {
  const p = (await prefmdb.findOne({_id: req.user.profile._id})) || {};
  res.status(200).json(p.classes?Object.keys(p.classes).join(''):'null');
})

api.get('/me/messages/inbox', async function (req, res, next) {
  res.send(await schoology.fetchMessagesInbox(req.user))
})

api.get('/me/messages/sent', async function (req, res, next) {
  res.send(await schoology.fetchMessagesSent(req.user))
})

api.get('/me/messages/inbox/:messageid', async function(req, res, next) {
  res.send(await schoology.fetchInboxMessage(req.user, req.params.messageid))
})
api.get('/me/messages/sent/:messageid', async function(req, res, next) {
  res.send(await schoology.fetchSentMessage(req.user, req.params.messageid))
})

api.post('/me/messages/:messageid', async function(req, res, next) {
  // recipient, message, subject
  const datums = req.body
  await schoology.replyToMessage(req.user, req.params.messageid, datums)
  res.sendStatus(204).end()
})

api.get('/me/events/week', async function(req, res, next) {
  res.send([...(await schoology.fetchWeekUserEvents(req.user)), ...(await schoology.fetchAllSectionEventsForWeek(req.user))])
})

api.get('/me/events/week/sections', async function(req, res, next) {
  res.send(await schoology.fetchAllSectionEventsForWeek(req.user))
})

app.post('/auth/elimination/user', passport.authenticate('jwt'), async function (req, res){
  const {user} = req.body;
  if (!user) return res.status(400).send({error:'null-user'});
  await elimdb.updateOne({_id:req.user.profile.uid}, {$set:{token: user}}, {upsert: true});
  res.status(201).send({success: true});
})

app.get('/auth/elimination/user', passport.authenticate('jwt'), async function (req, res){
  const resp = await elimdb.findOne({_id:req.user.profile.uid});
  if (!resp){
    res.status(401).send({error:'not-found'});
  }
  res.status(200).send({user: resp.token});
})

api.get('/me/recent', async function(req, res, next) {
  res.send(await schoology.fetchRecentUpdates(req.user));
});

api.post('/like/:updateid', async function(req, res, next){
  res.send(await schoology.like(req.user, req.params.updateid, req.body.desiredOutcome));
})

api.get('/me/sections/:sectionid/document/:documentid', async function (req, res, next){
  res.send(await schoology.getDocument(req.user, req.params.sectionid, req.params.documentid))
})

api.get('/me/sections/:sectionid/page/:pageid', async function (req, res, next){
  res.send(await schoology.getPage(req.user, req.params.sectionid, req.params.pageid))
})

api.get('/me/grades', async function (req, res, next){
  res.send(await schoology.getAllGrades(req.user));
})

api.get('/assignments/pending',  async function(req, res) {
  console.log("i run")
  const sections = await schoology.getSections(req.user)
  let resp = [];
  for (const section of sections){
    const assignments = await schoology.getPendingAssignmentsForSection(req.user, section.id);
    resp = [resp, assignments].flat()
  }
  res.status(200).send(resp)
})

app.use('/', api)



app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})



module.exports = app
