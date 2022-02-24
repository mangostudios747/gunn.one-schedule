const API_DOMAIN = 'https://api.gunnelimination.com'
let userCache;
let db;
const req = window.indexedDB.open("EliminationDB", 1)

req.onerror = event => {
  console.error(event)
};

req.onupgradeneeded = (event) => {
  userCache = db.createObjectStore('users', {keyPath: 'userID'});
  userCache.createIndex('userID', 'userID', {unique: true});
  userCache.transaction.oncomplete = event => {

  }
};

req.onsuccess = async () => {
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
                          'Content-Type': 'application/json'
                      }
                  }).then(e => e.json()));
                 resolve(user);
              }
              else resolve(user);
          }
          const user = await fetch(`${API_DOMAIN}/users/${uid}`, {
              headers: {
                  'Content-Type': 'application/json'
              }
          }).then(e => e.json());
          db.transaction("users", "readwrite").objectStore('users').put(user);
          if (gameId) {
              Object.assign(user, await fetch(`${API_DOMAIN}/elimination/game/${gameId}/user/${uid}`, {
                  headers: {
                      'Content-Type': 'application/json'
                  }
              }).then(e => e.json()));
          }
          resolve(user);

  });

}

class EliminationGame {
  constructor(sdk, gameId){
    this.cache = {
      users:{},
      leaderboard:[],
      killFeed:[]
    }
    this.sdk = sdk;
    this.gameId = gameId;
  }

  async init(){
    await this.fetchSelf();
  }
  async fetchSelf(){
    Object.assign(this, await this.sdk.getFrom(`game/${this.gameId}`));
  }

  async fetchLeaderboard(){
    return Promise.all((await this.sdk.getFrom(`elimination/game/${this.gameId}/top`)).map(async (x) => {
      // set target and entity
      x.user = await this.sdk.fetchUser(x.userID);
      return x
    }))
  }
}
class EliminationSDK {
  constructor() {

  }
  Game(...args){
    return new EliminationGame(this, ...args)
  }
  async getFrom(path, body = undefined){
    const response = await fetch(`${API_DOMAIN}/${path}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('g1.eliminationUser')}`,
        'Content-Type':'application/json',
      },
      body: body && JSON.stringify(body)
    })
    if (response.status === 200){
      return await response.json();
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
    return await this.getFrom('users/'+uid)
  }
  async fetchGames(){
    const gameList = await this.getFrom('games');
    const t = this;
    return await Promise.all(gameList.map(async function (x) {
      x.joined = (await t.getFrom(`game/${x.id}/joined`)).joined;
      return x
    }))
  }

}

export default ({ app }, inject) => {
  const elim = new EliminationSDK()
  inject('elim', elim);
}
