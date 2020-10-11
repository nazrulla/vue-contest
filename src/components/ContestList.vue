<template>
  <table class="table table-dark table-hover">
    <thead>
      <tr>
        <th scope="col" style="width: 70%">Contest Name</th>
        <th scope="col" style="width: 30%">Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(contest, index) in futureContests" :key="contest.id" :class="{ 'bg-success': index == 0 }">
        <td>{{ contest.name }}</td>
        <td>{{ format(contest.startTimeSeconds) }}</td>
      </tr>
    </tbody>
  </table>
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
      return this.contests.filter((contest) => contest.phase == "BEFORE").sort(function(a, b){
        if(a.startTimeSeconds < b.startTimeSeconds)
          return -1;
        if(a.startTimeSeconds > b.startTimeSeconds)
          return 1;
        return 0;
      })
    },
  },
  created() {
    axios.get("http://codeforces.com/api/contest.list").then((response) => {
      this.contests = response.data.result;
    });
  },
  methods: {
    format(seconds) {
      var date = new Date(seconds * 1000);
      date.setHours(date.getHours() + 5);
      return date.toUTCString();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
