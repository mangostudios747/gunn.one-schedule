<template>
  <div class="w-full flex-col h-full flex mt-5 px-2">
    <div
      class="text-center text-white font-bold text-xl"
      v-if="$fetchState.pending"
    >
      <div class="flex justify-center items-center">
        <div
          class="
            spinner-border
            animate-spin
            inline-block
            w-8
            h-8
            border-4
            rounded-full
            text-white/80
          "
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      Loading grades...
    </div>
    <div v-else class="flex flex-col">
      <div class="flex flex-row">
        <div class="box mr-auto py-1 px-2 text-white font-bold">
          {{
            $store.getters["schedule/sectionInfo"](section.id).name ||
            section.course_title
          }}
          / Grades
        </div>
        <div class="grow"></div>
        <div class="ml-auto py-1">
          <span class="my-auto text-white font-bold text-lg"
            >Grade: {{ grades.grade }}%</span
          >
        </div>
      </div>
      <div class="box flex flex-row my-2 rounded-sm py-1 pl-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4 w-4 text-white/50 my-auto"
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
        <input
          v-model="searchString"
          placeholder="Search by name, description, and more"
          class="
            block
            bg-transparent
            pl-2
            outline-none
            text-white
            placeholder:text-white/50
            w-full
          "
        />
      </div>
      <div
        class="flex flex-col my-2"
        :key="category.id"
        v-for="category of grades.categories"
      >
        <div class="flex flex-row justify-between text-white text-lg font-bold">
          <h2 class="mr-auto">{{ category.title }}</h2>
          <span
            >{{ category.weight + "%" }} |
            {{ (category.grade && category.grade + "%") || "N/A" }}</span
          >
        </div>
        <div
          class="flex flex-row justify-between text-white"
          :key="assignment.id"
          v-for="assignment of category.assignments"
        >
          <span>{{ assignment.title || "Unknown" }}</span>
          <span>{{ assignment.grade }}/{{ assignment.max_points }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}
export default {
  data: () => ({ grades: [], section: {}, searchString: "" }),
  async asyncData({ params, app }) {
    const user = await app.$cookies.get("auth._token.schoology");
    //console.log(user)
    if (!user) return { grades: [] };
    const { sectionId } = params;

    return { user, sectionId };
  },
  fetchOnServer: false,
  async fetch() {
    const { grades } = await this.$axios.$get(
      `/sections/${this.$route.params.sectionId}/grades`,
      {
        headers: { Authorization: getCookie("auth._token.schoology") },
      }
    );
    const section = await this.$axios.$get(
      `/sections/${this.$route.params.sectionId}`,
      {
        headers: { Authorization: getCookie("auth._token.schoology") },
      }
    );
    this.grades = grades || [];
    this.section = section;
  },
};
</script>

<style scoped>
</style>
