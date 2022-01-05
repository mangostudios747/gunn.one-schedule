export const state = ()=>({
    darkMode: false // update from mongodb on load
})

export const mutations = {
    setDarkMode(state, darkMode){
        state.darkMode = darkMode;
    }
}