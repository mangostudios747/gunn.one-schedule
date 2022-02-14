import { vuexfireMutations } from 'vuexfire'
import EliminationPersistPlugin from "~/plugins/eliminationPersist";
export const state = ()=>({
    darkMode: false, // update from mongodb on load
    sidebar: false,
})

export const plugins = [
  EliminationPersistPlugin
]

export const mutations = {
    setDarkMode(state, darkMode){
        state.darkMode = darkMode;
    },
    setSidebar(state, sidebar){
        state.sidebar =  sidebar;
    },
    ...vuexfireMutations
}
