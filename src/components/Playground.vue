<template>
  <svg
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
    <edge
      :x1="edge.x1"
      :y1="edge.y1"
      :x2="edge.x2"
      :y2="edge.y2"
      v-for="edge in edges"
      :key="edge.id"
    ></edge>
  </svg>
</template>

<script>
import Vertex from "./Vertex.vue";
import Edge from "./Edge.vue";
export default {
  name: "Playground",
  components: {
    Vertex,
    Edge
  },
  data() {
    return {
      startId: null,
      endId: null,
      count: 0,
      vertices: [],
      edges: [],
      points: [],
    };
  },
  methods: {
    start($event) {
      this.startId = this.points[$event.y * this.$window.innerWidth + $event.x];
    },
    end($event) {
      if (this.startId === undefined) return;
      this.endId = this.points[$event.y * this.$window.innerWidth + $event.x];
      if (this.endId !== undefined) this.connect();
    },
    connect() {
      if (this.vertices[this.startId]["neighbors"][this.endId]) return;
      this.vertices[this.startId]["neighbors"][this.endId] = true;
      this.drawLine(this.startId, this.endId);
    },
    drawLine(start, end) {
      this.edges.push({
        x1: this.vertices[start].x,
        y1: this.vertices[start].y,
        x2: this.vertices[end].x,
        y2: this.vertices[end].y
      })
      return;
    },
    addVertex($event) {
      var [x, y] = this.findCoordinates($event);
      if (x == -1) return;
      this.vertices.push({
        id: this.count++,
        x: x,
        y: y,
        neighbors: {},
      });
      var width = this.$window.innerWidth;
      //filling up points with vertex index
      var half = this.$circle/2
      for (var i = -half; i < half; i++) {
        for (var j = -half; j < half; j++) {
          this.points[(y + i) * width + x + j] = this.count - 1;
        }
      }
    },
    findCoordinates($event) {
      let y = Math.min(
        Math.max($event.y, this.$circle / 2),
        this.$window.innerHeight - this.$circle / 2
      );
      let x = Math.min(
        Math.max($event.x, this.$circle / 2),
        this.$window.innerWidth - this.$circle / 2
      );
      var width = this.$window.innerWidth;
      for (var i = 0; i < this.$circle; i++) {
        for (var j = 0; j < this.$circle; j++) {
          if (typeof this.points[(y + i) * width + x + j] !== "undefined") {
            return [-1, -1];
          }
        }
      }
      return [x, y];
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
