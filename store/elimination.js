
export const state = () => ({
  // User token
  user: false,
  popup: {},
  qr:false
})

export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setPopup(state, id){
    state.popup = id;
  },
  setQR(state, secret){
    state.qr = secret;
  }
}

export const actions = {
  async login({state, commit}, {email, password}) {
    try {
      const response = await this.$axios.$post('https://api.gunnelimination.com/login', {
        email, password
      }, {
        headers: {
          'content-type': 'application/json'
        }
      });
      commit('setUser', response);
      await this.$router.push('/app/elimination')
    }
    catch (e) {
      console.log(e)
    }
  },
  async signup({state, commit}, creds) {
    const response = await this.$axios.$post('https://api.gunnelimination.com/signup', {
      ...creds,
      createdBy:"Gunn.One",
      redirectURL:'https://gunn.one/app/elimination/callback'
    }, {
      headers: {
        'content-type': 'application/json'
      }
    });
    commit('setUser', response)
  }
}


