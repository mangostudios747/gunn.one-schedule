const API_DOMAIN = 'https://api.gunnelimination.com'
let userCache;
let db;
const req = window.indexedDB.open("EliminationDB", 1)

req.onerror = event => {
  console.error(event)
};

req.onupgradeneeded = (event) => {
  userCache = req.result.createObjectStore('users', {keyPath: 'userID'});
  userCache.createIndex('userID', 'userID', {unique: true});
  userCache.transaction.oncomplete = event => {

  }
};

req.onsuccess = () => {
  db = req.result
}

function getUserProfile(uid, gameId= null) {

  return new Promise(async (resolve, reject) => {
          const UserT = db.transaction("users", "readwrite").objectStore('users');
          const ureq = UserT.get(uid)
          ureq.onsuccess = async () => {
              if (!ureq.result) return;
              let user = JSON.parse(JSON.stringify(ureq.result))
              if (gameId) {
                  user = Object.assign(user, await fetch(`${API_DOMAIN}/elimination/game/${gameId}/user/${uid}`, {
                    headers: {
                      'Authorization': `Bearer ${localStorage.getItem('g1.eliminationUser')}`,
                      'Content-Type':'application/json',
                    },
                  }).then(e => e.json()));
                 resolve(user);
              }
              else resolve(user);
          }
          const user = await fetch(`${API_DOMAIN}/users/${uid}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('g1.eliminationUser')}`,
              'Content-Type':'application/json',
            },
          }).then(e => e.json());
          db.transaction("users", "readwrite").objectStore('users').put(user);
          if (gameId) {
              Object.assign(user, await fetch(`${API_DOMAIN}/elimination/game/${gameId}/user/${uid}`, {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('g1.eliminationUser')}`,
                  'Content-Type':'application/json',
                },
              }).then(e => e.json()));
          }
          resolve(user);

  });

}

class EliminationGame {
  constructor(sdk, gameId){
    this.cache = {
      me:{},
      users:{},
      leaderboard:[],
      killFeed:[]
    }
    this.sdk = sdk;
    this.gameId = gameId;
  }
  async eliminate(uid, eliminationCode){
    return await this.sdk.getFrom(`elimination/game/${this.gameId}/user/${uid}/eliminate`, {eliminationCode}, 'POST', false)
  }
  async init(){
    await this.fetchGame();
    await this.fetchLeaderboard();
    await this.fetchSelf()
  }

  async fetchSelf(){
    this.cache.me =  await this.fetchUser('@me')
    return this.cache.me
  }

  async fetchUser(uid){
    const user = await getUserProfile(uid, this.gameId);
    user.rank = this.cache.leaderboard.findIndex(e=>e.userID === user.userID) + 1
    this.cache.users[user.userID] = user;
    return user;
  }
  async fetchGame(){
    Object.assign(this, await this.sdk.getFrom(`game/${this.gameId}`));
  }

  async fetchKillFeed(){
    return await Promise.all((await this.sdk.getFrom(`elimination/game/${this.gameId}/kills`)).map(async (x)=>{
        x.target = await this.fetchUser(x.target);
        x.entity = await this.fetchUser(x.entity);
        return x
    }))
  }

  async fetchLeaderboard(){
    this.cache.leaderboard =  await Promise.all((await this.sdk.getFrom(`elimination/game/${this.gameId}/top`)).map(async (x) => {
      // set target and entity
      x.user = await this.fetchUser(x.userID);
      return x
    }))
    return this.cache.leaderboard
  }
}
class EliminationSDK {
  constructor() {
  }
  Game(...args){
    return new EliminationGame(this, ...args)
  }
  async getFrom(path, body = undefined, method='GET', json=true){
    const response = await fetch(`${API_DOMAIN}/${path}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('g1.eliminationUser')}`,
        'Content-Type':'application/json',
      },
      body: body && JSON.stringify(body),
      method
    })
    if (response.status === 200){
      return json? await response.json() : await response.text();
    }
    else {
      return {
        error: true,
        response
      }
    }
  }
  async fetchUser(uid){
    // need to implement a cache
    return await getUserProfile(uid)
  }
  async fetchGames(){
    const gameList = await this.getFrom('games');
    const t = this;
    return await Promise.all(gameList.map(async function (x) {
      x.joined = (await t.getFrom(`game/${x.id}/joined`)).joined;
      return x
    }))
  }
  async joinGame(id){
    return await this.getFrom(`game/${id}/join`, null, 'POST', false)
  }

}

export default ({ app }, inject) => {
  const elim = new EliminationSDK()
  inject('elim', elim);
}
