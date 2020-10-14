<template>
  <div
    id="playground"
    @click.prevent="addVertex($event)"
    @mousedown.prevent="start($event)"
    @mouseup.prevent="end($event)"
  >
    <vertex
      :x="vertex.x"
      :y="vertex.y"
      v-for="vertex in vertices"
      :key="vertex.id"
      :id="vertex.id"
    ></vertex>
  </div>
</template>

<script>
import Vertex from "./Vertex.vue";

export default {
  name: "Playground",
  components: {
    Vertex,
  },
  data() {
    return {
      startId: null,
      endId: null,
      count: 0,
      vertices: [],
    };
  },
  methods: {
    start($event) {
      if ($event.target.tagName == "IMG") this.startId = $event.target.id;
      else this.startId = null;
    },
    end($event) {
      if(this.startId == null) return;
      if($event.target.tagName == "IMG"){
        this.endId = $event.target.id
        this.connect()
      }
    },
    connect(){
      console.log(this.startId + " " + this.endId + " are connected now")
    },
    addVertex($event) {
      this.vertices.push({
        id: this.count++,
        x: this.findX($event),
        y: this.findY($event),
      });
    },
    findX($event) {
      let x = Math.min(
        Math.max($event.x - this.$circle / 2, 0),
        this.$window.innerWidth - this.$circle
      );
      return x;
    },
    findY($event) {
      let y = Math.min(
        Math.max($event.y - this.$circle / 2, 0),
        this.$window.innerHeight - this.$circle
      );
      return y;
    },
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
