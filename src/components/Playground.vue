<template>
  <div id="playground" @click="addVertex">
    <vertex v-for="vertex in vertices" :key="vertex.id"></vertex>    
  </div>
</template>

<script>
export default {
  name: "Playground",
  components: ['Vertex'],
  data() {
    return {
      vertices: []
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #playground {
    background-color: green;
    width: 100%;
    height: 100%;
  }
</style>
