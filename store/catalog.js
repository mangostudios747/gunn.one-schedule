export const state = ()=>({
    yearCourses:{},
    s1Courses:{},
    s2Courses:{},
    key: Date.now()
});

export const actions = {
    toggleYearCourse({state, commit}, id){
        if (state.yearCourses[id]){
            commit('removeYearCourse', id)
        }
        else {
            commit('addYearCourse', id)
        }
        commit('updateKey')
    },
    toggleS1Course({state, commit}, id){
        if (state.s1Courses[id]){
            commit('removeS1Course', id)
        }
        else {
            commit('addS1Course', id)
        }
        commit('updateKey')
    },
    toggleS2Course({state, commit}, id){
        if (state.s2Courses[id]){
            commit('removeS2Course', id)
        }
        else {
            commit('addS2Course', id)
        }
        commit('updateKey')
    }
}

export const mutations = {
    updateKey(state){
        state.key = Date.now()
    },
    addYearCourse(state, id){
        state.yearCourses[id] = true;
    },
    removeYearCourse(state, id){
        delete state.yearCourses[id];
    },
    addS1Course(state, id){
        state.s1Courses[id] = true;
    },
    removeS1Course(state, id){
        delete state.s1Courses[id];
    },
    addS2Course(state, id){
        state.s2Courses[id] = true;
    },
    removeS2Course(state, id){
        delete state.s2Courses[id];
    }
}