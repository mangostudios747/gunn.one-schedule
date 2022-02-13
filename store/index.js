import { vuexfireMutations } from 'vuexfire'
export const state = ()=>({
    darkMode: false, // update from mongodb on load
    sidebar: false,

})

export const mutations = {
    setDarkMode(state, darkMode){
        state.darkMode = darkMode;
    },
    setSidebar(state, sidebar){
        state.sidebar =  sidebar;
    },
    ...vuexfireMutations
}
