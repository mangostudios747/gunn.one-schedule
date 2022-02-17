import { vuexfireMutations } from 'vuexfire'
export const state = ()=>({
    darkMode: false, // update from mongodb on load
    sidebar: false,
    barcode:'00000',

})

export const mutations = {
    setDarkMode(state, darkMode){
        state.darkMode = darkMode;
    },
    setSidebar(state, sidebar){
        state.sidebar =  sidebar;
    },
    setBarcode(state, barcode){
        state.barcode = barcode || '00000';
        localStorage.setItem('g1.barcode', state.barcode)
    },
    ...vuexfireMutations
}
