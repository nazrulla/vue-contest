<template>
  <p v-for="contest in futureContests" :key="contest.id">
    <span>{{ contest.name }}</span>
    <span>{{ format(contest.startTimeSeconds) }}</span>
  </p>
</template>

<script>
const axios = require("axios");
export default {
  name: "ContestList",
  data() {
    return {
      contests: [],
    };
  },
  computed: {
    futureContests() {
      return this.contests.filter(contest => contest.phase == 'BEFORE')
    }
  },
  created() {
    axios
      .get("http://codeforces.com/api/contest.list")
      .then(
        response => {
          this.contests = response.data.result
        }
      );
  },
  methods: {
    format(seconds){
      var date = new Date(seconds * 1000)
      date.setHours(date.getHours() + 5)
      return date.toUTCString()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
