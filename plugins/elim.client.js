const API_DOMAIN = 'https://api.gunnelimination.com'

class EliminationSDK {
  constructor() {
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
  async fetchLeaderboard(gameId){
    return Promise.all((await this.getFrom(`elimination/game/${gameId}/top`)).map(async (x) => {
      // set target and entity
      x.user = await this.fetchUser(x.userID);
      return x
    }))
  }
}

export default ({ app }, inject) => {
  const elim = new EliminationSDK()
  inject('elim', elim);
}
