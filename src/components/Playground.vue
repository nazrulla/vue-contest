<template>
  <div
    id="playground"
    @click.prevent="addVertex($event)"
    @mousedown.prevent="start($event)"
    @mouseup.prevent="end($event)"
  >
    <svg>
      <symbol id="wave">
        <path
          d="M420,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C514,6.5,518,4.7,528.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M420,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C326,6.5,322,4.7,311.5,2.7C304.3,1.4,293.6-0.1,280,0c0,0,0,0,0,0v20H420z"
        ></path>
        <path
          d="M140,20c21.5-0.4,38.8-2.5,51.1-4.5c13.4-2.2,26.5-5.2,27.3-5.4C234,6.5,238,4.7,248.5,2.7c7.1-1.3,17.9-2.8,31.5-2.7c0,0,0,0,0,0v20H140z"
        ></path>
        <path
          d="M140,20c-21.5-0.4-38.8-2.5-51.1-4.5c-13.4-2.2-26.5-5.2-27.3-5.4C46,6.5,42,4.7,31.5,2.7C24.3,1.4,13.6-0.1,0,0c0,0,0,0,0,0l0,20H140z"
        ></path>
      </symbol>
    </svg>
    <vertex
      :x="vertex.x"
      :y="vertex.y"
      :vertex="vertex"
      v-for="vertex in vertices"
      :key="vertex.id"
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
      if (this.endId !== undefined && this.endId != this.startId) this.connect();
    },
    connect() {
      if (this.vertices[this.startId]["neighbors"][this.endId]) return;
      this.vertices[this.startId]["neighbors"][this.endId] = {
        x1: this.vertices[this.startId].x,
        y1: this.vertices[this.startId].y,
        x2: this.vertices[this.endId].x,
        y2: this.vertices[this.endId].y,
      };
      console.log(this.startId+" and "+this.endId+" are connected ");
      console.log("coordinates of x1 "+this.vertices[this.startId].x+" coordinates of x2 "+this.vertices[this.endId].x);
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
      var half = this.$circle / 2;
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
      var half = this.$circle / 2;
      for (var i = -half; i < half; i++) {
        for (var j = -half; j < half; j++) {
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
svg {
  display: none,
}
</style>
