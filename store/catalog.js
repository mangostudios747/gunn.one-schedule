import courses from '~/content/parsedCourses.json'

export const state = ()=>({
    yearCourses:{},
    s1Courses:{},
    s2Courses:{},
    key: Date.now(),
    searchString: '',
    selectedCourse:false
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

export const getters = {
    totalHW(state){
        let t = 0;
        const cids = [...Object.keys(state.yearCourses), ...Object.keys(state.s1Courses), ...Object.keys(state.s2Courses)]
        for (const cid of cids){
            t += courses[cid].homework
        }
        return t+ (state.key - state.key)
    },
    totalCredits(state){
        return Object.keys(state.yearCourses).length*10 + Object.keys(state.s1Courses).length*5 + Object.keys(state.s2Courses).length*5 + (state.key - state.key)
    },
    filteredCourses(state){

        const c = Object.entries(courses).filter(function([key, course]){
            return (course.body && course.body.description.toLowerCase().includes(state.searchString.toLowerCase())) || course.name.toLowerCase().includes(state.searchString.toLowerCase()) || course.id.toLowerCase().includes(state.searchString.toLowerCase()) || course.code.toLowerCase().includes(state.searchString.toLowerCase())
        })
        return Object.fromEntries(c)
    }
}

export const mutations = {
    setSearchString(state, s){
        state.searchString = s
    },
    setSelectedCourse(state, id){
        state.selectedCourse = id
    },
    loadSelection(state){
        state.yearCourses = JSON.parse(localStorage.getItem('yearCourses') || '{}');
        state.s1Courses = JSON.parse(localStorage.getItem('s1Courses') || '{}')
        state.s2Courses = JSON.parse(localStorage.getItem('s2Courses') || '{}')
    },
    updateKey(state){
        state.key = Date.now();
        // also save everything
        localStorage.setItem('yearCourses', JSON.stringify(state.yearCourses));
        localStorage.setItem('s1Courses', JSON.stringify(state.s1Courses))
        localStorage.setItem('s2Courses', JSON.stringify(state.s2Courses))
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