import EliminationPersistPlugin from "~/plugins/eliminationPersist";

export const state = () => ({
  // User token
  user: false
})

export const mutations = {
  setUser(state, user) {
    state.user = user;
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
      commit('setUser', response)
    }
    catch (e) {
      console.log(e)
    }
  },
  signup({state, commit}, creds) {
    const response = this.$axios.$post('https://api.gunnelimination.com/signup', {
      ...creds,
      redirectURL:'https://gunn.one/app/elimination/callback'
    }, {
      headers: {
        'content-type': 'application/json'
      }
    });

    console.log(response)
  }
}


