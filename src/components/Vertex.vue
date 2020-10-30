<template>
  <edge
    :x1="edge.x1"
    :y1="edge.y1"
    :x2="edge.x2"
    :y2="edge.y2"
    v-for="(edge, end) in vertex['neighbors']"
    :key="end"
  ></edge>
  <div class="vertex" :style="style"></div>
</template>
<script>
import Edge from "./Edge.vue";
export default {
  components: {
    Edge,
  },
  name: "Vertex",
  data() {
    return {};
  },
  props: {
    x: Number,
    y: Number,
    vertex: Object
  },
  computed: {
    style() {
      return {
        left: this.xForDiv + "px",
        top: this.yForDiv + "px",
        width: this.$circle + "px",
        height: this.$circle + "px",
      };
    },
    xForDiv() {
      return this.x - this.$circle / 2;
    },
    yForDiv() {
      return this.y - this.$circle / 2;
    },
  },
};
</script>

<style scoped>
.vertex {
  position: absolute;
  z-index: 3;
  background: red;
  border-radius: 100%;
}
</style>
