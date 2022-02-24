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
  constructor(sdk, ns, gameId){
    this.ns = ns;
    this.cache = {
      users:{},
      leaderboard:[],
      killFeed:[]
    }
    this.sdk = sdk;
    this.gameId = gameId;
  }

  async init(){
    await this.fetchGame();
    await this.fetchLeaderboard();
  }

  async fetchSelf(){
    return await this.fetchUser('@me')
  }

  async fetchUser(uid){
    return await getUserProfile(uid, this.gameId)
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
  constructor(ns) {
    this.ns = ns;
  }
  Game(...args){
    return new EliminationGame(this, this.ns, ...args)
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

}

export default ({ app, $nuxtSocket }, inject) => {
  const elim = new EliminationSDK($nuxtSocket)
  inject('elim', elim);
}
