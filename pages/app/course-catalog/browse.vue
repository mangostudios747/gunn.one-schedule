<template>
  <div class="flex flex-auto flex-col">
    <div class="box mt-2 rounded-sm flex flex-row py-1 px-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4 text-white/50 my-auto "
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input v-model="searchString" placeholder="Search by name, description, or ID" class="block bg-transparent px-2  outline-none text-white placeholder:text-white/50 w-full" />
    </div>
    <div
      class="flex-col flex flex-auto overflow-y-auto h-0 mt-2 p-1 space-y-1 box"
    >
      <div
      
        class="px-3 py-2 cursor-pointer flex gap-3 w-full flex-row text-white"
        :key="key"
        v-for="(course, key) of $store.getters['catalog/filteredCourses']"
      >
        <div class="big-icon flex">
          <div v-if="course.subject.a"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-red-100
              text-red-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 block my-auto mx-auto"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="course.subject.b"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-blue-100
              text-blue-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
              />
            </svg>
          </div>
          <div v-else-if="course.subject.c"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-amber-100
              text-amber-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M4.649 3.084A1 1 0 015.163 4.4 13.95 13.95 0 004 10c0 1.993.416 3.886 1.164 5.6a1 1 0 01-1.832.8A15.95 15.95 0 012 10c0-2.274.475-4.44 1.332-6.4a1 1 0 011.317-.516zM12.96 7a3 3 0 00-2.342 1.126l-.328.41-.111-.279A2 2 0 008.323 7H8a1 1 0 000 2h.323l.532 1.33-1.035 1.295a1 1 0 01-.781.375H7a1 1 0 100 2h.039a3 3 0 002.342-1.126l.328-.41.111.279A2 2 0 0011.677 14H12a1 1 0 100-2h-.323l-.532-1.33 1.035-1.295A1 1 0 0112.961 9H13a1 1 0 100-2h-.039zm1.874-2.6a1 1 0 011.833-.8A15.95 15.95 0 0118 10c0 2.274-.475 4.44-1.332 6.4a1 1 0 11-1.832-.8A13.949 13.949 0 0016 10c0-1.993-.416-3.886-1.165-5.6z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="course.subject.d"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-green-100
              text-green-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="course.subject.e"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-cyan-100
              text-cyan-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div v-else-if="course.subject.cte"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-purple-100
              text-purple-700/30
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
  <path d="M13 7H7v6h6V7z" />
  <path fill-rule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clip-rule="evenodd" />
</svg>
          </div>
          <div v-else-if="course.subject.vpa"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-orange-100
              text-orange-700/30
            "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z"
              />
            </svg>
          </div>
          <div v-else-if="course.subject.pe"
            class="
              w-8
              h-8
              my-auto
              mx-auto
              rounded-full
              flex
              bg-indigo-100
              text-indigo-700/30
            "
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
</svg>
          </div>
        </div>
        <div @click="$store.commit('catalog/setSelectedCourse', key)" class="info grow-0 flex flex-col">
          <span class="block font-semibold text-lg leading-6"
            >{{ course.code
            }}<span class="text-white/60">#{{ course.id }}</span></span
          >
          <p v-if="course.body" class="line-clamp-2 text-xs leading-4">{{ course.body.description }}</p>
        </div>
        <div
          v-if="course.length==='Semester'"
          class="buttons flex flex-col gap-3 px-1 py-2 justify-between"
        >
          <button
            :key="key+'-'+$store.state.catalog.key+'-1'"
          @click="$store.dispatch('catalog/toggleS1Course', key)"
            :class="
              $store.state.catalog.s1Courses[key] ? 'bg-white text-blue-700' : 'bg-blue-900/20 text-white'
            "
            class="w-8 rounded-sm text-xs"
          >
            {{$store.state.catalog.s1Courses[key] ? '-':'+'}} S1
          </button>
          <button
            :key="key+'-'+$store.state.catalog.key+'-2'"
          @click="$store.dispatch('catalog/toggleS2Course', key)"
            :class="
              $store.state.catalog.s2Courses[key] ? 'bg-white text-blue-700' : 'bg-blue-900/20 text-white'
            "
            class="w-8 rounded-sm text-xs"
          >
            {{$store.state.catalog.s2Courses[key] ? '-':'+'}} S2
          </button>
        </div>
        <div
          v-else
          class="
            
            flex flex-col
            gap-2
            
            justify-between
          "
        >
          <button
          :key="key+'-'+$store.state.catalog.key"
          @click="$store.dispatch('catalog/toggleYearCourse', key)"
            :class="
              $store.state.catalog.yearCourses[key] ? 'bg-white text-blue-700' : 'bg-blue-900/20 text-white'
            "
            class="
              px-1 py-1 
              rounded-sm
              text-xs
              shadow-md
              hover:shadow-lg
              mx-auto
              my-auto
              font-bold
            "
          >
            {{$store.state.catalog.yearCourses[key] ? '-':'+'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import courses from '~/content/parsedCourses.json'
export default {
  computed:{
    searchString: {
      get(){
        return this.$store.state.catalog.searchString
      },
      set(e){
        this.$store.commit('catalog/setSearchString', e)
      }
    }
  },
  data: () => ({
    courses,
    fakeCourse: {
      name: "AP SELF",
      code: "AP Sel",
      id: "0666",
      description:
        "dNEUWQIR, ERNGQ, ewf. rnguiewneui! wrqo, ewortiqreo wrje ww ttrr gt? wnoq rfio weanqow rewon feo wrtw, weioj, weort, woiq, wer ewroi  hj! aqoiii ewioj   eroj  fjoaoi  aon aeio  erqg  perhrgrew gergpoerg tr gtr hr h rh trh rt h  gre g  ew fa g wh wer yh er fge t ew g er yrt h s get  hrtd gr g fs hrt 6y ersg d hrh.",
      isVPA: true,
      isCTE: false,
      prereqs: "Prior completion of SELF 9, or approval of instructor.",
      homework: 320,
      subject: {
        e: true,
      },
    },
  }),
};
</script>

<style scoped>
.icon {
  @apply h-5 w-5 block my-auto mx-auto;
}
</style>