export const state = ()=>({
  user: false
})

export const mutations = {
  setUser(state, user){
    state.user = user;
  }
}
