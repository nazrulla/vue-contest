<template>
  <div id="vertex" :style="style"></div>
</template>
<script>
export default {
  name: "Vertex",
  data() {
    return {};
  },
  props: {
    x: Number,
    y: Number,
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
#vertex {
  position: absolute;
  background: red;
  border-radius: 100%;
}
</style>
