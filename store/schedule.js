import {firebaseAction} from 'vuexfire'
import theSchedule from '@/assets/defaultSchedule.json'
import {customizations} from '~/assets/defaultCustomizations'

export const state = () => ({
  theSchedule, customizations, now: new Date(), //new Date()
})

export const actions = {
  bindSchedule: firebaseAction(function ({bindFirebaseRef}) {
    const ref = this.$fire.database
      .ref('/schedule');

    return bindFirebaseRef('theSchedule', ref);
  }),
  customize({state, commit}, courses) {
    const cust = {}
    for (const {course_title, section_title, id, profile_url} of courses) {
      const key = +section_title.split(' ')[0]
      if (key) {
        // valid period class
        cust['Period ' + key] = JSON.parse(JSON.stringify(state.customizations['Period ' + key])) || {};
        cust['Period ' + key].meta = {};
        cust['Period ' + key].meta.id = id
        cust['Period ' + key].name = state.customizations['Period ' + key].name || course_title
        cust['Period ' + key].meta.photo = profile_url
        cust['Period ' + key].meta.course_home = `https://pausd.schoology.com/course/${id}/materials`
      } else if (key === 'SELF') {
        //state.customizations[key] = {};
        cust[key].meta = {};
        cust[key].meta.id = id
        cust[key].name = course_title
        cust[key].meta.photo = profile_url
        cust[key].meta.course_home = `https://pausd.schoology.com/course/${id}/materials`
      }
    }
    commit('setCustomizations', {customizations: cust, sgy: true})
  }
}

export const getters = {
  scheduleForDate: (state) => (dob) => {
    const sched = state.theSchedule;
    if (!sched) return [];
    const ref = dob.getMonth() + '-' + dob.getDate() + '-' + dob.getFullYear();
    let rtv;
    if (dob < new Date(2021, 7, 15)) {
      return []
    }
    if (ref in sched.overrides) {
      //console.log("overridden");

      rtv = sched.overrides[ref]
    } else if (ref in sched.holidays) {
      /* if (mainView) {
         this.holidayReason = sched.holidays[ref]
       }*/
      let rt = [];
      rt.reason = sched.holidays[ref];
      return rt //empty schedule, and set the holiday reason to what it is
    } else {
      //console.log("default");
      //if (mainView) this.holidayReason = null;
      rtv = sched.defaults[dob.getDay()] || [];
    }
    return (rtv).map(function (event) {
      const start = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), event.start[0], event.start[1]);
      const end = new Date(dob.getFullYear(), dob.getMonth(), dob.getDate(), event.end[0], event.end[1]);
      let progress;
      let status;
      const now = state.now;// (new Date)//.addDays(2);
      if (now < start) {
        progress = 0;
        status = periodStates.FUTURE
      } else if (now > end) {
        progress = 100
        status = periodStates.PAST
      } else {
        progress = (now - start) * 100 / (end - start);
        status = periodStates.PRESENT
      }
      return {
        name: (state.customizations[event.name] || state.customizations['Other']).name || event.name,
        meta: (state.customizations[event.name] || {meta: {}}).meta,
        id: event.name,
        start,
        end,
        status,
        timed: true,
        progress,
        color: (state.customizations[event.name] || state.customizations['Other']).color
      }
    })//regular schedule for this day of the week
  },
  currentEvent: (state, getters) => {
    //console.log('hello');
    const now = state.now//.addDays(2)
    const sched = getters.scheduleForDate(now)
    for (let index in sched) {
      const event = sched[index]
      const start = event.start
      //console.log(start);
      // if we even got here, then either the previous doesn't exist or isn't happening.
      if (now < start) {

        return {
          type: 'future',
          name: (state.customizations[event.id] || {name: undefined}).name || event.name,
          meta: state.customizations[event.id] || {},
          id: event.id,
          displayText: 'until',
          remaining: (+start - now) / 60000,
          elapsed: null,
          total: null,
          percent: index !== 0 ? (100 - (+start - now) / 6000) : null,
          isValid: true

        }
      }
      const end = event.end
      if (start <= now && now <= end) {
        return {
          type: 'current',
          name: (state.customizations[event.name] || {name: undefined}).name || event.name,
          meta: state.customizations[event.id] || {},
          id: event.id,
          displayText: 'left in',
          remaining: (+end - now) / 60000,
          elapsed: (+now - start) / 60000,
          total: (+end - start) / 60000,
          percent: (+now - start) * (100) / (+end - start),
          isValid: true
        }
      }
      // ok so either it's the last period or some later period is happening
      else if (parseInt(index) === sched.length - 1) {
        // since!
        return {
          type: 'since',
          name: (state.customizations[event.name] || {name: undefined}).name || event.name,
          meta: state.customizations[event.id] || {},
          id: event.id,
          displayText: 'since',
          remaining: null,
          elapsed: (+now - end) / 60000,
          total: null,
          percent: null,
          isValid: false  // we don't want to be like since 7th period happened you're still at school
        }

      }

    }
    return {
      type: "none", name: "Today", isHoliday: true, isValid: false, remaining: "No School", percent: 0
    }

  }, holidayReason: (state) => (ref) => {
    return state.theSchedule.holidays[ref];
  }, upcomingEvents: (state, getters) => {
    const schedule = getters.scheduleForDate(state.now)
    const currId = getters.currentEvent.name
    let upcoming = []
    let ready = false
    for (let event of schedule) {
      if (ready) {
        upcoming.push(event)
      }
      if (event.name === currId) {

        ready = true
        if (getters.currentEvent.type === 'future') {
          upcoming.push(event)
        }

      }

    }
    return upcoming
  },
  sectionInfo: (state) => (sid) => {
    return Object.values(state.customizations).filter(({meta}) => {
      if (!meta) return false;
      return meta.id === sid;
    })[0] || {}
  }
}
export const mutations = {
  resetTime(state) {
    //console.log('bye')
    state.now = (new Date())//.addHours(15);
  }, loadCustomizations(state, customizations) {
    if (!customizations) return;
    state.customizations = JSON.parse(JSON.stringify(customizations));
  }, async setCustomizations(state, {customizations, sgy}) {
    if (!customizations) return;
    Object.assign(state.customizations, JSON.parse(JSON.stringify(customizations)));

    // todo: update user preferences.classes

    if (sgy) await this.$axios.$patch('/preferences/classes', JSON.stringify(state.customizations));
  }, updateSchedule: function (state, schedule) {
    state.theSchedule = schedule
  },
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

Date.prototype.addHours = function (hrs) {
  let date = new Date(this.valueOf())
  date.setHours(date.getHours() + hrs)
  return date
}

Date.prototype.addMinutes = function (hrs) {
  let date = new Date(this.valueOf())
  date.setMinutes(date.getMinutes() + hrs)
  return date
}

const periodStates = {
  PAST: -1, PRESENT: 0, FUTURE: 1
}
