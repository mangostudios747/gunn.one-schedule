
const oauth = require('./oauth')
const { mdb } = require('../database')
let userDatamdb:any; // to-do: get access to types
mdb.then((c:any)=>{
  userDatamdb = c.db('users').collection('profiles');
})
const sgyDomain: string = 'https://pausd.schoology.com'
const apiBase: string = 'https://api.schoology.com/v1'
const usersCache: Record<string, any> = {}
const updatesCache = {}

interface UserCredentials {
  token: string;
  tokenSecret: string;
}

interface User {
  profile: any;
  credentials: UserCredentials;
}

function getNextDayOfWeek(date: Date, dayOfWeek = 5) {
  // Code to check that date and dayOfWeek are valid left as an exercise ;)


  const resultDate = new Date(date.getTime())

  resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7)

  return resultDate
}

function getMonday(d: Date) {
  d = new Date(d)
  const day = d.getDay(),
    diff = d.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday
  return new Date(d.setDate(diff))
}

function dateToString(date: Date): string {
  return (([a, b, c]: string[]) => ([a, b, +c - 1].join('-')))(date.toISOString().split('T')[0].split('-'))
}

function flattenArray(arr: any[]): any[] {
  const result = []
  for (let sub of arr) {
    result.push(...sub)
  }
  return result
}

function toJson([data]: any[]) {
  return JSON.parse(data)
}

// node-oauth only follows 301 and 302 HTTP statuses, but Schoology redirects
// /users/me with a 303 status >_<
function follow303(err: any) {
  if (err.statusCode === 303) {
    const [, request] = err.out
    //console.log(request.headers.location)
    return oauth.get(request.headers.location, ...err.args.slice(1))
  } else {
    return Promise.reject(err)
  }
}

/*export async function getFrom(path, creds){
    return await (oauth.get(`${apiBase}${!path.startsWith('/')? '/':''}${path}`, creds.token, creds.tokenSecret)
        .catch(follow303)
        .then(toJson))
}*/
async function getFrom(path: string, creds: UserCredentials, method: string = 'get', body: string | null = null) {
  if (method === 'get') {
    return await (oauth[method](`${apiBase}${!path.startsWith('/') ? '/' : ''}${path}`, creds.token, creds.tokenSecret)
      .catch(follow303)
      .then(toJson))
      .catch(console.error)
  } else {
    return await (oauth[method](`${apiBase}${!path.startsWith('/') ? '/' : ''}${path}`,
      creds.token, creds.tokenSecret, body, 'application/json')
      .then(toJson))
      .catch(console.error)
  }

  //.catch(k=>console.log(k.out[1].headers))
}

export async function getProfile(creds: UserCredentials) {
  const value = await getFrom('users/me?extended=TRUE', creds)
  usersCache[value.uid] = value
  return value
}

export async function getProfileFor(creds: UserCredentials, uid: string) {
  if (usersCache[uid]) return usersCache[uid]
  const returnValue = await getFrom(`users/${uid}?extended=TRUE`, creds)
  usersCache[uid] = returnValue
  return returnValue
}

export async function fetchSections(user: User) {
  const apiResult = await getFrom(`/users/${user.profile.uid}/sections`, user.credentials)
  return apiResult.section.sort((section1: any, section2: any) => {
    return (+section1.section_title.split(' ')[0] || Infinity) - (+section2.section_title.split(' ')[0] || Infinity)
  }) // an array of sections loll
}

export async function reloadSections(user: User) {
  // get the sections
  const sections = await fetchSections(user)
  // put them in the database
  //userDatadb.set(`${user.profile.uid}.sections`, sections).write()
  await userDatamdb.updateOne({_id:+user.profile.uid}, {
    $set:{
      sections
    },
  }, {upsert:true})
  return sections
}

export async function getSections(user: User) {
  // we only need the uid hmm
  let { sections } = (await userDatamdb.findOne(
    {_id:+user.profile.uid}
  ))||{};
  if (!sections) {
    // we hath not loaded the sections! ever!
    sections = await reloadSections(user)
  }
  return sections
}

export async function fetchAssignmentsForSection(sectionId: string, creds: UserCredentials) {
  // get the assignments from a specific course!
  return (await getFrom(`/sections/${sectionId}/assignments`, creds)).assignment
}

export async function reloadAssignmentsForSection(user: User, sectionId: string) {
  // put them in the database

  /*for (let index in asg) {
    userDatadb.set(`${user.profile.uid}.assignments.${sectionId}.${index}`, asg[index]).write();
  }*/

  return await fetchAssignmentsForSection(sectionId, user.credentials)
}

export async function getAssignmentsForSection(user: User, sectionId: string) {
  // we only need the uid hmm
  //let data = null//userDatadb.get(`${user.profile.uid}.assignments.${sectionId}`).value();
  // we hath not loaded the data! ever!
  return await reloadAssignmentsForSection(user, sectionId)
}

export async function getPendingAssignmentsForSection(user: User, sectionId: string) {
  // we only need the uid hmm
  let data = await getAssignmentsForSection(user, sectionId)
  return data.filter((assignment: any) => {
    return !!(assignment.available && !assignment.completed)
  })
}

export async function fetchMessagesInbox(user: User) {
  const messages = (await getFrom('/messages/inbox', user.credentials)).message
  //console.log(messages);
  for (let index in messages) {
    const { author_id } = messages[index]
    console.log(messages[index].id)
    //messages[index]['recipient'] = await getProfileFor(user.credentials, recipient_ids);
    messages[index]['author'] = await getProfileFor(user.credentials, author_id)
  }
  return messages
}

export async function fetchMessagesSent(user: User, page = 1) {
  const {
    message: messages,
    unreadCount
  } = (await getFrom(`/messages/sent?start=${20 * (page - 1)}&limit=${page * 20}`, user.credentials))
  //console.log(messages);
  for (let index in messages) {
    const { recipient_ids } = messages[index]
    //console.log(messages[index].id)
    const rids = recipient_ids.split(',')
    messages[index]['recipients'] = []
    for (const rid of rids) {
      messages[index]['recipients'].push(await getProfileFor(user.credentials, rid))
    }
  }
  return messages
}

export async function fetchInboxMessage(user: User, messageId: string) {
  const { message } = await getFrom(`/messages/inbox/${messageId}`, user.credentials)
  for (let index in message) {
    const { recipient_ids, author_id } = message[index]
    message[index]['author'] = await getProfileFor(user.credentials, author_id)
    message[index]['recipients'] = []
    const rids = recipient_ids.split(',')
    for (const rid of rids) {
      message[index]['recipients'].push(await getProfileFor(user.credentials, rid))
    }
  }
  return message
}

export async function fetchSentMessage(user: User, messageId: string) {
  const { message } = await getFrom(`/messages/sent/${messageId}`, user.credentials)
  for (let index in message) {
    const { recipient_ids, author_id } = message[index]
    message[index]['author'] = await getProfileFor(user.credentials, author_id)
    message[index]['recipients'] = []
    const rids = recipient_ids.split(',')
    for (const rid of rids) {
      message[index]['recipients'].push(await getProfileFor(user.credentials, rid))
    }
  }
  return message
}

interface Message {
  recipient_ids: string,
  subject: string,
  message: string
}

export async function replyToMessage(user: User, messageId: string, datums: Message) {
  // datums should have {recipient_ids, subject, message}
  return await getFrom(`/messages/${messageId}`, user.credentials, 'post',
    JSON.stringify(datums))
  // the client should now reload the messages.
}

export async function newMessage(user: User, datums: Message) {
  return await getFrom(`/messages`, user.credentials, 'post',
    JSON.stringify(datums))
}

export async function getSectionFolder(user: User, sectionid: string, folderid: number = 0) {
  return await getFrom(`/courses/${sectionid}/folder/${folderid}?with_attachments=1`, user.credentials)
    .then(e => e['folder-item'] ? e['folder-item'].map((k: any) => ({
      ...k,
      name: k.title,
      children: k.type === 'folder' ? [] : undefined
    })) : [])
}

export async function getSection(user: User, sectionid: string) {
  return await getFrom(`/sections/${sectionid}/`, user.credentials)
}

export async function fetchWeekUserEvents(user: User) {
  const base = new Date
  const today = dateToString(base)
  const friday = dateToString(getNextDayOfWeek(base))
  return (await getFrom(`/users/${user.profile.uid}/events?start_date=${today}&end_date=${friday}`,
    user.credentials))
    .event
    .map((event: { has_end: any; end: any; start: any; color: any; type: 'event' | 'assignment' | 'discussion'; timed: boolean; all_day: any; name: any; title: any; links: undefined; }) => {
      if (!event.has_end) {
        event.end = event.start
      }
      event.color = {
        event: 'green darken-2',
        assignment: 'primary',
        discussion: 'accent'
      }[event.type] || 'purple darken-1'
      //console.log(event.type)
      event.timed = !event.all_day
      event.name = event.title
      event.links = undefined
      return event
    })
}

export async function fetchAllSectionEventsForWeek(user: User) {

  const start: Date = new Date
  const end: Date = new Date
  start.setDate(0)
  end.setMonth((start.getMonth() + 1) % 12)
  end.setDate(0)
  const monday: string = dateToString(start)
  const friday: string = dateToString(end)
  // a list of section ids
  const sections: string[] = (await getSections(user))
    .map((a: any) => a.id)
    .map((a: any) => `/v1/sections/${a}/events?start_date=${monday}&end_date=${friday}`)
  //console.log(sections)
  return flattenArray((await getFrom(`/multiget`, user.credentials, 'post', JSON.stringify({
    request: sections
  })))
    .response
    .map((a: { body: { event: any; }; }) => a.body.event))
    .map(event => {
      if (!event.has_end) {
        event.end = event.start
      }
      // @ts-ignore
      event.color = {
        event: 'grey',
        assignment: 'primary',
        discussion: 'yellow',
        external_tool: 'accent'
      }[event.type] || 'purple darken-1'
      //console.log(event.type)
      event.timed = !event.all_day
      event.name = event.title
      event.links = undefined
      return event
    })

}

export async function fetchLinkDetails(user: User, sectionid: string, documentid: string) {
  return await getFrom(`/sections/${sectionid}/documents/${documentid}`, user.credentials)
    .then(e => e.attachments.links.link[0])
}

export async function fetchExternalToolDetails(user: User, sectionid: string, documentid: string) {
  return await getFrom(`/sections/${sectionid}/documents/${documentid}`, user.credentials)
    .then(e => e.attachments.external_tools.external_tool[0])
}

export async function fetchFileDetails(user: User, sectionid: string, documentid: string) {
  return await getFrom(`/sections/${sectionid}/documents/${documentid}`, user.credentials)
    .then(e => e.attachments.files.file[0])
}

export async function getUpdate(user: User, updateid: string) {
  return await getFrom(`/users/${user.profile.uid}/updates/${updateid}?with_attachments=true&richtext=1`, user.credentials)

}

export async function fetchRecentUpdates(user: User) {
  const updates = await getFrom(`/recent?limit=50?with_attachments=true&richtext=1`, user.credentials)
    .then(e => e.update)
  for (let update of updates) {
    update.author = await getProfileFor(user.credentials, update.uid)
    //Object.assign(update, await getUpdate(user, update.id))
  }
  return updates
}

export async function fetchCourseUpdates(user: User, courseid: string) {
  const updates = await getFrom(`/sections/${courseid}/updates?limit=50&with_attachments=true&richtext=1`, user.credentials)
    .then(e => e.update)
  for (let update of updates) {
    update.author = await getProfileFor(user.credentials, update.uid)
    //Object.assign(update, await getUpdate(user, update.id))
  }
  return updates
}


// like an update - ACTION
export async function like(user: User, updateid: string, like_action: boolean) {
  return await getFrom(`/like/${updateid}`, user.credentials, 'post', JSON.stringify({
    like_action
  }))
}

// works for documents, links, etc
export async function getDocument(user: User, sectionid: string, documentid: string) {
  return await getFrom(`sections/${sectionid}/documents/${documentid}`, user.credentials)
}

// the raw stuff
export async function getPage(user: User, sectionid: string, pageid: string) {
  return await getFrom(`sections/${sectionid}/pages/${pageid}`, user.credentials)
}

async function getSectionAssignments(user: User, sectionid:string) {
  return await getFrom(`sections/${sectionid}/assignments`, user.credentials)
    .then(e=>(e.assignment))
}

async function getSectionGrades(user: User, sectionid:string) {

  return await getFrom(`/users/${user.profile.uid}/grades?section_id=${sectionid}`, user.credentials)
    .then(e=>e.section)
}

async function sortedSectionGrades(user:User, sectionid:string) {
  const [g] = await getSectionGrades(user, sectionid); const a = await getSectionAssignments(user, sectionid);
  if (!g) return undefined
  // a is a reference, g is the thing we need to transform
  const categories:Record<string,any> = {};
  g.grading_category.forEach((c:any)=> {
    c.assignments = []
    categories[c.id] = c;
  })

  const grades = g.final_grade.find((e:any)=>e.weight);
  grades.grading_category.forEach((c:any)=>Object.assign(categories[c.category_id], c));

  const assignments = g.period.find((e:any)=>e.period_id===grades.period_id).assignment;
  for (const as of assignments) {
    const asg_info = a.find((e:any)=>e.id===as.assignment_id)
    if (asg_info){
      Object.assign(as, asg_info);
    }

    categories[as.category_id].assignments.push(as)
  }
  grades.categories = categories
  return grades
}

export async function getAllGrades(user: User) {
  const sectionids = (await getSections(user)).map((section: { id: string }) => section.id)
  const grades: Record<string, any> = {};
  for (const sectionid of sectionids) {
    grades[sectionid] = await sortedSectionGrades(user, sectionid);
  }
  return grades
}


export async function getSectionAnnouncement(user: User, sectionid: string) {
  return await getFrom(`sections/${sectionid}/updates`, user.credentials)
    .then(e=>e.update.sort((a:any, b:any) => b.last_updated - a.last_updated)[0])
}
