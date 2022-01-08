import { vuexfireMutations } from 'vuexfire'
export const state = ()=>({
    darkMode: false // update from mongodb on load
})

export const mutations = {
    setDarkMode(state, darkMode){
        state.darkMode = darkMode;
    },
    ...vuexfireMutations
}
